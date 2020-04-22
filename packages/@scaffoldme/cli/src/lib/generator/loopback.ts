import { Api, Input } from "@scaffoldme/core";
import * as chalk from "chalk";
import Listr from "listr";
import { SchematicRunner } from "../runners/schematic.runner";
const execa = require("execa");

var shell = require("shelljs");

/*
const pwdStdout = shell.exec("pwd").stdout;
const pwd = pwdStdout.replace(/\n/g, ""); */

export class Loopback {
  getListTask(loopback: Api, inputs: Input[], options: Input[]): Listr {
    let runner = new SchematicRunner();
    console.log(
      chalk.default.bgYellowBright(
        `Installation du Framework ${loopback.framework?.technologyName}`
      )
    );
    shell.echo("");

    const tasks = [
      {
        title: `Installation du Framework ${loopback.framework?.technologyName}`,
        task: () =>
          execa.shell(
            `${runner.findClosestSchematicsBinary()} @scaffoldme/schematics-loopback:application`
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
        task: () => execa.shell(`docker build -t loopback-app:v1 .`),
      },
      {
        title: `Run docker container`,
        task: () =>
          execa.shell(
            "docker run --name loopback_app -p 3000:3000 -d loopback-app:v1"
          ),
      },
    ];

    return new Listr(tasks);
  }
}
