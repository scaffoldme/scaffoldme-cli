import { IFrontEnd} from '@scaffoldme/core';
import * as chalk from 'chalk';
import Listr from 'listr';
import { SchematicRunner } from '../runners/schematic.runner';
const execa = require('execa');

const shell = require('shelljs');

/*
const pwdStdout = shell.exec("pwd").stdout;
const pwd = pwdStdout.replace(/\n/g, ""); */

export class ReactGenerator {
  getListTask(react: IFrontEnd): Listr {
    const runner = new SchematicRunner();
    console.log(
      chalk.default.bgYellowBright(
        `Installation du Framework ${react.framework?.technologyName}`
      )
    );
    shell.echo('');

    const tasks = [
      {
        title: `Installation du Framework ${react.framework?.technologyName}`,
        task: () =>
          execa.shell(
            `${runner.findClosestSchematicsBinary()} @scaffoldme/schematics-react:application`
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
        task: () => execa.shell(`docker build -t react-app:v1 .`),
      },
      {
        title: `Run docker container`,
        task: () =>
          execa.shell(
            'docker run --name react_app -p 3000:3000 -d react-app:v1'
          ),
      },
    ];

    return new Listr(tasks);
  }
}
