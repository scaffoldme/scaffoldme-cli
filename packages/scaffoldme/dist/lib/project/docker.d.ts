import { ProjectDeps } from '.';
import { IDockerContainer } from '../../definitions';
export declare class DockerContainer implements IDockerContainer {
    readonly name: string;
    readonly imageName: string;
    readonly deps: ProjectDeps;
    readonly environmentName: string;
    constructor(environmentName: string, deps: ProjectDeps);
    /**
     * Installs the environment in a docker container.
     */
    buildImage(): Promise<DockerContainer>;
}
