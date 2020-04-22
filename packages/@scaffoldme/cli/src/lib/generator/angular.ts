import { FrontEnd } from "@scaffoldme/core";
import * as chalk from "chalk";
import Listr from "listr";
import { SchematicRunner } from "../runners/schematic.runner";
const execa = require("execa");

var shell = require("shelljs");

//import { Environment } from "../interface/Environment";

/*
const pwdStdout = shell.exec("pwd").stdout;
const pwd = pwdStdout.replace(/\n/g, ""); */

export class Angular {
  getListTask(front: FrontEnd): Listr {
    let runner = new SchematicRunner();
    console.log(
      chalk.default.bgYellowBright(
        `Installation du Framework ${front.framework?.technologyName}`
      )
    );
    shell.echo("");

    const tasks = [
      {
        title: `Installation du Framework ${front.framework?.technologyName}`,
        task: () =>
          execa.shell(
            `${runner.findClosestSchematicsBinary()} @scaffoldme/schematics-angular:application`
          ),
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
        task: () =>
          execa.shell(
            "docker run --name angular_app -p 4200:80 -d angular-app:v1"
          ),
      },
    ];

    return new Listr(tasks);
  }
}
