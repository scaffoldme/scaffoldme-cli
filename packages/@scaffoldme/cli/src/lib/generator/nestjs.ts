import { Api } from '@scaffoldme/core';
import * as chalk from 'chalk';
import Listr from 'listr';
import { SchematicRunner } from '../runners/schematic.runner';
const execa = require('execa');

const shell = require('shelljs');

/*
const pwdStdout = shell.exec("pwd").stdout;
const pwd = pwdStdout.replace(/\n/g, ""); */

export class NestjsGenerator {
  getListTask(nestjs: Api): Listr {
    const runner = new SchematicRunner();
    console.log(
      chalk.default.bgYellowBright(
        `Installation du Framework ${nestjs.framework?.technologyName}`
      )
    );
    shell.echo('');

    const tasks = [
      {
        title: `Installation du Framework ${nestjs.framework?.technologyName}`,
        task: () =>
          execa.shell(
            `${runner.findClosestSchematicsBinary()} @scaffoldme/schematics-nestjs:application`
          ),
      },
      {
        title: `Update DockerFile`,
        task: () => execa.shell('mv Dockerfile.template Dockerfile'),
      },
      {
        title: 'Updates npm packages',
        task: () => execa.shell(`npm install`),
      },
      {
        title: 'Build docker image',
        task: () => execa.shell(`docker build -t nestjs-app:v1 .`),
      },
      {
        title: `Run docker container`,
        task: () =>
          execa.shell(
            'docker run --name nestjs_app -p 5000:80 -d nestjs-app:v1'
          ),
      },
    ];

    return new Listr(tasks);
  }
}
