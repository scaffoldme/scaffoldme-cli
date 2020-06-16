"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockerRunner = void 0;
const tslib_1 = require("tslib");
const listr_1 = tslib_1.__importDefault(require("listr"));
const execa = require("execa");
class DockerRunner {
    constructor() { }
    async startContainer(container_name) {
        new listr_1.default([
            {
                title: `Start docker container ${container_name}`,
                task: () => execa.shell(`docker start ${container_name}`),
            },
        ]).run();
    }
    async stopContainer(container_name) {
        new listr_1.default([
            {
                title: `Stop docker container ${container_name}`,
                task: () => execa.shell(`docker stop ${container_name}`),
            },
        ]).run();
    }
}
exports.DockerRunner = DockerRunner;
