import { ProjectDeps } from '..';
import { ITechnologyProject, IVersion, TechnologyName, TechnologyType } from '../../../definitions';
export declare abstract class Framework implements ITechnologyProject {
    readonly selectedVersion: IVersion;
    protected readonly deps: ProjectDeps;
    abstract readonly name: TechnologyName;
    abstract readonly port: number;
    readonly technologyType: TechnologyType;
    constructor(selectedVersion: IVersion, deps: ProjectDeps);
    /**
     * Clone framework from github
     * @param {string} environmentName Name of the folder that will contain the framework
     */
    abstract install(environmentName: string): Promise<void>;
}
