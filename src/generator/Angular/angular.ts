import { exec } from 'child_process';
import { Environment } from "./../../interface/Environment";
import { Framework } from "./../../interface/Framework";
import { watcher } from "../../../utils/watcher";
var shell = require("shelljs");
import * as chalk from "chalk";
const execa = require('execa');
import Listr from 'listr';


export class Angular{

  getListTask(environment: Environment) : Listr {

    console.log(chalk.default.bgCyan(`${environment.framework.name}`));
    shell.echo('');

    const tasks = [
      {
        title: `🔧  Installation du Framework`,
        task: async () =>
            execa('git', ['clone', `https://github.com/scaffoldme/angular-starter.git`, `${environment.environmentType}`])
            //.catch(() => task.skip())
      },
      {
        title: '📦  update Dependencies',
        task: async () =>
            execa('npm', [`install`, 'ajv', '--save'])
      },
      {
        title: '📦  Updates npm packages',
        task: async () =>
            execa.shell(`cd ${environment.environmentType} && npm install`)
      },
      {
        title: '🐳  Build docker image',
        task: () =>
            execa.shell(`cd ${environment.environmentType} && docker build -t angular-app:v1 .`)
      },
      {
        title: `🐳  Run docker container ${environment.environmentType}`,
        task: () =>
            execa.shell('docker run --name angular_app -p 4200:80 -d angular-app:v1')
      }

    ];

    return new Listr(tasks);

    //watcher(
    //  `📦  Installation du Framework ${environment.framework.name}`,
    //  `git clone https://github.com/scaffoldme/angular-starter.git ${
    //    environment.environmentType
    //  }`
    //);

    /**update Dependencies */
    // shell.cd(`${environment.environmentType}`);
    // shell.exec('npm install')
    // watcher('📦  update Dependencies', 'npm i ajv --save');

     /**Build docker image */
    //  watcher('📦  Build image docker', 'docker build -t angular-app:v1 .');

    /**Runing docker image */
    // watcher('📦  Run image docker', 'docker run -p 4200:80 -d angular-app:v1');

    // console.log(chalk.default.green(`your ${environment.environmentType} running at http://localhost:4200`));

  }

  async addstyle(typeStyle: string) {}
}
