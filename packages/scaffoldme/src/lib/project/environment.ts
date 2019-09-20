import { mkdirSync } from '@ionic/utils-fs';
import * as boxen from 'boxen';
import { ProjectDeps } from '.';
import { DEFAULT_PORT_ANGULAR, DEFAULT_PORT_LOOPBACK } from '../../constants';
import { EnvironmentType, IEnvironment, ITechnologyProject } from '../../definitions';
import { strong } from '../color';
import { FatalException } from '../errors';
import { DockerContainer } from './docker';
import { Framework } from './frameworks';
import { AngularFramework } from './frameworks/angular/index';
import { LoopbackFramework } from './frameworks/loopback/index';

export class Environment implements IEnvironment {
  readonly id: string;
  readonly environmentType: EnvironmentType;
  readonly style: ITechnologyProject;
  readonly typing: ITechnologyProject;
  readonly modules: ITechnologyProject[];
  readonly name: string;
  readonly description: string;
  readonly framework: Framework;
  readonly dockerContainer: DockerContainer;
  readonly deps: ProjectDeps;

  constructor({ id, name, description, environmentType, framework, style, typing, modules }: IEnvironment, deps: ProjectDeps) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.environmentType = environmentType;
    this.typing = typing;
    this.style = style;
    this.modules = modules;
    this.deps = deps;
    this.dockerContainer = new DockerContainer(this.name, this.deps);
    this.framework = this.setFramework(framework);
  }

  /**
   * Installs the project in the current folder. A folder is created for each environment with a docker container.
   * @param {IEnvironment} environment Information of the environment to be generated
   */
  async installFramework(): Promise<void> {
    try {
      mkdirSync(this.name);
      await this.framework.install(this.name);
    } catch (e) {
      throw e;
    }
  }

  async buildImage(): Promise<DockerContainer> {
    return this.dockerContainer.buildImage();
  }

  /**
   * Returns an instance of the framework based on the name of the framework
   */
  setFramework(framework: ITechnologyProject): Framework {
    switch (framework.name) {
      case 'angular':
        return new AngularFramework(this.deps, framework.selectedVersion, DEFAULT_PORT_ANGULAR);
      case 'loopback':
        return new LoopbackFramework(this.deps, framework.selectedVersion, DEFAULT_PORT_LOOPBACK);
    }
    throw new FatalException(`${strong(String(framework.name))} framework incompatible`);
  }

  getInfos(): void {
    const text: string = `Powered with 💙  by scaffoldme team\n` +
      `Your app runing at http://localhost:${this.framework.port.toString()}\nYour docker container name is : ${this.name}_app\n` +
      `Your docker container image name is : ${this.name}-app:v1`;

    this.deps.log.msg(boxen(text, { padding: 1, margin: 1 }));
  }
}
