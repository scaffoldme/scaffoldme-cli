"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Angular = void 0;
const tslib_1 = require("tslib");
const chalk = tslib_1.__importStar(require("chalk"));
const listr_1 = tslib_1.__importDefault(require("listr"));
const schematic_runner_1 = require("../runners/schematic.runner");
const execa = require("execa");
var shell = require("shelljs");
//import { Environment } from "../interface/Environment";
/*
const pwdStdout = shell.exec("pwd").stdout;
const pwd = pwdStdout.replace(/\n/g, ""); */
class Angular {
    getListTask(front) {
        var _a, _b;
        let runner = new schematic_runner_1.SchematicRunner();
        console.log(chalk.default.bgYellowBright(`Installation du Framework ${(_a = front.framework) === null || _a === void 0 ? void 0 : _a.technologyName}`));
        shell.echo("");
        const tasks = [
            {
                title: `Installation du Framework ${(_b = front.framework) === null || _b === void 0 ? void 0 : _b.technologyName}`,
                task: () => execa.shell(`${runner.findClosestSchematicsBinary()} @scaffoldme/schematics-angular:application`),
            },
            {
                title: `Update DockerFile`,
                task: () => execa.shell("mv Dockerfile.template Dockerfile"),
            },
            {
                title: "Updates npm packages",
                task: () => execa.shell(`npm install`),
            },
            {
                title: "Build docker image",
                task: () => execa.shell(`docker build -t angular-app:v1 .`),
            },
            {
                title: `Run docker container`,
                task: () => execa.shell("docker run --name angular_app -p 4200:80 -d angular-app:v1"),
            },
        ];
        return new listr_1.default(tasks);
    }
}
exports.Angular = Angular;
