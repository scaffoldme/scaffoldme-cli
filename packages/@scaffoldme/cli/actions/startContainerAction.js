"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartContainerAction = void 0;
const docker_runner_1 = require("../lib/runners/docker.runner");
const abstractAction_1 = require("./abstractAction");
class StartContainerAction extends abstractAction_1.AbstractAction {
    constructor(docker_runner = new docker_runner_1.DockerRunner()) {
        super();
        this.docker_runner = docker_runner;
    }
    async handle(inputs) {
        // console.log({ inputs });
        const container_name = inputs.find((option) => option.name === "container_name").value;
        this.docker_runner.startContainer(container_name);
    }
}
exports.StartContainerAction = StartContainerAction;
