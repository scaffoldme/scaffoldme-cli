import { Framework } from "./../interface/Framework";
import { Environment } from "../interface/Environment";
import { watcher } from "../../utils/watcher";

var shell = require("shelljs");
import * as chalk from "chalk";

const execa = require('execa');
import Listr from 'listr';
/*
const pwdStdout = shell.exec("pwd").stdout;
const pwd = pwdStdout.replace(/\n/g, ""); */

export class Loopback {
  getListTask(environment: Environment): Listr {

      console.log(chalk.default.bgCyan(`${environment.framework.name}`));
      shell.echo('');

      const tasks =[
        {
          title: `🔧  Installation du Framework`,
          task: () =>
              execa('git', ['clone', `https://github.com/scaffoldme/Loopback-Starter.git`, `${environment.environmentType}`])
              //.catch(() => task.skip())
        },
        {
          title: '📦  Updates npm packages',
          task: () => execa.shell(`cd ${environment.environmentType} && npm install`)
        },
        {
          title: '🐋  Build docker image',
          task: () => execa.shell(`cd ${environment.environmentType} && docker build -t loopback-app:v1 .`)
        },
        {
          title: `🐋  Run docker container`,
          task: () => execa.shell('docker run -p 3000:3000 -d loopback-app:v1')
        }

      ];

    return new Listr(tasks);



/*     watcher(
      `📦  Installation du Framework ${environment.framework.name}`,
      `git clone https://github.com/scaffoldme/Loopback-Starter.git ${
        environment.environmentType
      }`
    );

    /**Install dependencies */
    // shell.cd(`${environment.environmentType}`);
    // watcher('📦  Install dependencies', 'npm i');

    /**Build docker image */
    // watcher('📦  Build image docker', 'docker build -t loopback-app:v1 .');

    /**Runing docker image */
   // watcher('📦  Run image docker', 'docker run -p 3000:3000 -d loopback-app:v1');

 //   console.log(chalk.default.green(`your ${environment.environmentType} running at http://localhost:3000`));

  }

  async addstyle(typeStyle: string) {}
}
