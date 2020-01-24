import { BaseConfigOptions, ParsedArgs, PromptModule } from '@ionic/cli-framework';
import { IClient, IConfig, IConfigScaffoldme, ILogger, InfoItem, IProject, ISession, IShell, ScaffoldmeContext, ScaffoldmeEnvironmentFlags } from '../../definitions';
import { BaseException } from '../errors';
import { Environment } from './environment';
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
export declare type ProjectDetailsResult = ProjectDetailsInstalledProjectResult | ProjectDetailsUnknownResult;
export declare type ProjectDetailsErrorCode = 'ERR_INVALID_PROJECT_FILE' | 'ERR_INVALID_PROJECT_TYPE' | 'ERR_MISSING_PROJECT_TYPE' | 'ERR_MULTI_MISSING_CONFIG' | 'ERR_MULTI_MISSING_ID' | 'ERR_FILE_NOT_FOUND';
export declare class ProjectDetailsError extends BaseException {
    /**
     * Unique code for this error.
     */
    readonly code: ProjectDetailsErrorCode;
    /**
     * The underlying error that caused this error.
     */
    readonly error?: Error | undefined;
    constructor(msg: string, 
    /**
     * Unique code for this error.
     */
    code: ProjectDetailsErrorCode, 
    /**
     * The underlying error that caused this error.
     */
    error?: Error | undefined);
}
export interface ProjectDetailsDeps {
    readonly rootDirectory: string;
    readonly args?: ParsedArgs;
    readonly e: ProjectDeps;
}
export declare class ProjectDetails {
    readonly rootDirectory: string;
    protected readonly e: ProjectDeps;
    protected readonly args: ParsedArgs;
    constructor({ rootDirectory, args, e }: ProjectDetailsDeps);
    processResult(result: ProjectDetailsResult): void;
    readConfig(p: string): Promise<IConfigScaffoldme>;
    /**
     * Gather project details from specified configuration.
     *
     * This method will always resolve with a result object, with an array of
     * errors. Use `processResult()` to log warnings & errors.
     */
    result(): Promise<ProjectDetailsResult>;
}
export declare function loadProjectFromProjectFile(rootDirectory: string, args: ParsedArgs, deps: ProjectDeps): Promise<IProject>;
export interface ProjectConfigOptions extends BaseConfigOptions {
}
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
export declare class Project implements IProject {
    readonly details: ProjectDetailsResult;
    protected readonly deps: ProjectDeps;
    readonly rootDirectory: string;
    readonly environments: Environment[];
    constructor(details: ProjectDetailsResult, deps: ProjectDeps);
    get filePath(): string;
    get directory(): string;
    getInfo(): Promise<InfoItem[]>;
}
