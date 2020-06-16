import { Input } from "@scaffoldme/core";
import { DockerRunner } from "../lib/runners/docker.runner";
import { AbstractAction } from "./abstractAction";
export declare class StopContainerAction extends AbstractAction {
    docker_runner: DockerRunner;
    constructor(docker_runner?: DockerRunner);
    handle(inputs: Input[]): Promise<void>;
}
