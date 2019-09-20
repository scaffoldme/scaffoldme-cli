import { IProject, ScaffoldmeEnvironment } from '../definitions';
import { CommandMap, Namespace, NamespaceMap } from '../lib/namespace';

export interface IonicEnvironmentDeps {
  readonly env: ScaffoldmeEnvironment;
  readonly project: IProject;
}

export class IonicNamespace extends Namespace {
  protected _env: ScaffoldmeEnvironment;
  protected _project: IProject;

  constructor({ env, project }: IonicEnvironmentDeps) {
    super(undefined);
    this._env = env;
    this._project = project;
  }

  get project(): IProject {
    return this._project;
  }

  set project(p: IProject) {
    this._project = p;
  }

  get env(): ScaffoldmeEnvironment {
    return this._env;
  }

  set env(env: ScaffoldmeEnvironment) {
    this._env = env;
  }

  async getMetadata() {
    return {
      name: 'ionic',
      summary: '',
    };
  }

  async getNamespaces(): Promise<NamespaceMap> {
    return new NamespaceMap([]);
  }

  async getCommands(): Promise<CommandMap> {
    return new CommandMap([
      ['install', async () => { const { InstallCommand } = await import('./install'); return new InstallCommand(this); }],
    ]);
  }
}
