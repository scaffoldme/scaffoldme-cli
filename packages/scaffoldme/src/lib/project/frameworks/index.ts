import { ProjectDeps } from '..';
import { ITechnologyProject, IVersion, TechnologyName, TechnologyType } from '../../../definitions';

export abstract class Framework implements ITechnologyProject {
  abstract readonly name: TechnologyName;
  abstract readonly port: number;
  readonly technologyType: TechnologyType = 'framework';

  constructor(readonly selectedVersion: IVersion, protected readonly deps: ProjectDeps) {
    this.selectedVersion = selectedVersion;
    this.deps = deps;
  }

  /**
   * Clone framework from github
   * @param {string} environmentName Name of the folder that will contain the framework
   */
  abstract install(environmentName: string): Promise<void>;
}
