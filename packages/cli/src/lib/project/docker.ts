import { ProjectDeps } from '.';
import { IDockerContainer } from '../../definitions';

export class DockerContainer implements IDockerContainer {
  readonly name: string;
  readonly imageName: string;
  // readonly portBind: number;
  readonly deps: ProjectDeps;
  readonly environmentName: string;

  constructor(environmentName: string, deps: ProjectDeps) {
    this.environmentName = environmentName;
    this.name = `${this.environmentName}_app`;
    this.imageName = `${this.environmentName}-app`;
    this.deps = deps;
  }

  /**
   * Installs the environment in a docker container.
   */
  async buildImage(): Promise<DockerContainer> {
    try {
      const path: string = `${this.deps.ctx.execPath}/${this.environmentName}`;
      await this.deps.shell.run('docker', ['build', '-t', `${this.imageName}:v1`, '.'], { cwd: path });
      return this;
    } catch (e) {
      throw e;
    }
  }
}
