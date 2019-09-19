import { BaseConfigOptions, ParsedArgs, PromptModule } from '@ionic/cli-framework';
import { prettyPath } from '@ionic/cli-framework/utils/format';
import { readFile, writeFile } from '@ionic/utils-fs';
import * as Debug from 'debug';
import * as path from 'path';
import { PROJECT_FILE } from '../../constants';
import { IClient, IConfig, IConfigScaffoldme, ILogger, InfoItem, IProject, ISession, IShell, ScaffoldmeContext, ScaffoldmeEnvironmentFlags } from '../../definitions';
import { isInstalledProject, isValidProject } from '../../guards';
import { failure, input, strong } from '../color';
import { BaseException } from '../errors';
import { Environment } from './environment';

const debug = Debug('scaffoldme:lib:project');

export interface ProjectDetailsResultBase {
  readonly errors: readonly ProjectDetailsError[];
  readonly configPath: string;
  readonly configScaffoldme: IConfigScaffoldme;
}

export interface ProjectDetailsInstalledProjectResult extends ProjectDetailsResultBase {
  readonly context: 'installedProject';
}

export interface ProjectDetailsUnknownResult extends ProjectDetailsResultBase {
  readonly context: 'unknown';
}

export type ProjectDetailsResult = ProjectDetailsInstalledProjectResult | ProjectDetailsUnknownResult;

export type ProjectDetailsErrorCode = 'ERR_INVALID_PROJECT_FILE' | 'ERR_INVALID_PROJECT_TYPE' | 'ERR_MISSING_PROJECT_TYPE' | 'ERR_MULTI_MISSING_CONFIG' | 'ERR_MULTI_MISSING_ID' | 'ERR_FILE_NOT_FOUND';

export class ProjectDetailsError extends BaseException {
  constructor(
    msg: string,

    /**
     * Unique code for this error.
     */
    readonly code: ProjectDetailsErrorCode,

    /**
     * The underlying error that caused this error.
     */
    readonly error?: Error
  ) {
    super(msg);
  }
}

export interface ProjectDetailsDeps {
  readonly rootDirectory: string;
  readonly args?: ParsedArgs;
  readonly e: ProjectDeps;
}

export class ProjectDetails {
  readonly rootDirectory: string;

  protected readonly e: ProjectDeps;
  protected readonly args: ParsedArgs;

  constructor({ rootDirectory, args = { _: [] }, e }: ProjectDetailsDeps) {
    this.rootDirectory = rootDirectory;
    this.e = e;
    this.args = args;
  }

  processResult(result: ProjectDetailsResult): void {
    const { log } = this.e;
    // const errorCodes = result.errors.map((e) => e.code);
    const e1 = result.errors.find((e) => e.code === 'ERR_INVALID_PROJECT_FILE');
    const e2 = result.errors.find((e) => e.code === 'ERR_FILE_NOT_FOUND');

    if (e1) {
      log.error(
        `Error while loading config (project config: ${strong(prettyPath(result.configPath))})\n` +
        `${e1.error ? `${e1.message}: ${failure(e1.error.toString())}` : failure(e1.message)}. ` +
        `Run ${input('scaffoldme init')} to re-initialize your Scaffoldme project. Without a valid project config, the CLI will not have project context.`
      );

      log.nl();
    }

    if (e2) {
      log.error(
        `${e2.message} (project config: ${strong(prettyPath(result.configPath))}).\n`
      );

      log.nl();
    }
  }

  async readConfig(p: string): Promise<IConfigScaffoldme> {
    try {
      let configContents = await readFile(p, { encoding: 'utf8' });

      if (!configContents) {
        configContents = '{}\n';
        await writeFile(p, configContents, { encoding: 'utf8' });
      }

      return await JSON.parse(configContents);
    } catch (e) {
      throw new ProjectDetailsError('Could not read project file', 'ERR_INVALID_PROJECT_FILE', e);
    }
  }

  /**
   * Gather project details from specified configuration.
   *
   * This method will always resolve with a result object, with an array of
   * errors. Use `processResult()` to log warnings & errors.
   */
  async result(): Promise<ProjectDetailsResult> {
    const errors: ProjectDetailsError[] = [];
    const configPath = path.resolve(this.rootDirectory, PROJECT_FILE);
    let config: IConfigScaffoldme;

    try {
      config = await this.readConfig(configPath);
    } catch (e) {
      errors.push(e);
      throw new ProjectDetailsError(`${PROJECT_FILE} not found`, 'ERR_FILE_NOT_FOUND');
    }

    if (!isValidProject(config)) {
      throw new ProjectDetailsError('Unknown project file structure', 'ERR_INVALID_PROJECT_FILE');
    }

    if (isInstalledProject(config)) {
      return { configPath, errors, ...{ configScaffoldme: config, context: 'installedProject' } };
    }

    return { configPath, errors, ...{ configScaffoldme: config, context: 'unknown' } };
  }
}

export async function loadProjectFromProjectFile(rootDirectory: string, args: ParsedArgs, deps: ProjectDeps): Promise<IProject> {
  const details = new ProjectDetails({ rootDirectory, args, e: deps });
  const result = await details.result();

  debug('Project details: %o', { ...result, errors: result.errors.map((e) => e.code) });

  return new Project(result, deps);
}

export interface ProjectConfigOptions extends BaseConfigOptions { }

export interface ProjectDeps {
  readonly client: IClient;
  readonly config: IConfig;
  readonly flags: ScaffoldmeEnvironmentFlags;
  readonly log: ILogger;
  readonly prompt: PromptModule;
  readonly session: ISession;
  readonly shell: IShell;
  readonly ctx: ScaffoldmeContext;
}

export class Project implements IProject {
  readonly rootDirectory: string;
  readonly environments: Environment[];

  constructor(
    readonly details: ProjectDetailsResult,
    protected readonly deps: ProjectDeps
  ) {
    this.rootDirectory = path.dirname(details.configPath);
    this.environments = [];
    for (const configEnvironment of this.details.configScaffoldme.environments) {
      this.environments.push(new Environment(configEnvironment, this.deps));
    }
  }

  get filePath(): string {
    return this.details.configPath;
  }

  get directory(): string {
    return this.rootDirectory;
  }

  async getInfo(): Promise<InfoItem[]> {
    return [];
  }
}
