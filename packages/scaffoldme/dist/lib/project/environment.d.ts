import { ProjectDeps } from '.';
import { EnvironmentType, IEnvironment, ITechnologyProject } from '../../definitions';
import { DockerContainer } from './docker';
import { Framework } from './frameworks';
export declare class Environment implements IEnvironment {
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
    constructor({ id, name, description, environmentType, framework, style, typing, modules }: IEnvironment, deps: ProjectDeps);
    /**
     * Installs the project in the current folder. A folder is created for each environment with a docker container.
     * @param {IEnvironment} environment Information of the environment to be generated
     */
    installFramework(): Promise<void>;
    buildImage(): Promise<DockerContainer>;
    /**
     * Returns an instance of the framework based on the name of the framework
     */
    setFramework(framework: ITechnologyProject): Framework;
    getInfos(): void;
}
