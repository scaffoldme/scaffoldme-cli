import { Input } from "@scaffoldme/core";
import { DockerRunner } from "../lib/runners/docker.runner";
import { AbstractAction } from "./abstractAction";

export class StopContainerAction extends AbstractAction {
  constructor(public docker_runner: DockerRunner = new DockerRunner()) {
    super();
  }
  public async handle(inputs: Input[]) {
    // console.log({ inputs });
    const container_name = inputs.find(
      (option) => option.name === "container_name"
    )!.value as string;
    this.docker_runner.stopContainer(container_name);
  }
}
