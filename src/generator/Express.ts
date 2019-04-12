import { Environment } from "../interface/Environment";
import { Framework } from "../interface/Framework";
var shell = require("shelljs");
import * as chalk from "chalk";
const execa = require('execa');
import Listr from 'listr';

export class Express{
  /* async generator(environment: Environment) {
    console.log(
      chalk.default.yellowBright(
        `Installation du Framework ${environment.framework.name} ( ${
          environment.environmentType
        } ) `
      )
    );
    if (
      shell.exec(
        `git clone https://github.com/scaffoldme/express-starter.git ${
          environment.environmentType
        }`
      ).code == 0
    ) {
      console.log(
        chalk.default.green(
          `Installation ${environment.environmentType} Done !! `
        )
      );
    }
  } */

  getListTask(environment: Environment): Listr {

    console.log(chalk.default.bgCyan(`${environment.framework.name}`));
    shell.echo('');

    const tasks =[
      {
        title: `🔧  Installation du Framework`,
        task: () =>
            execa('git', ['clone', `https://github.com/scaffoldme/express-starter.git`, `${environment.environmentType}`])
            //.catch(() => task.skip())
      },
      {
        title: '📦  Updates npm packages',
        task: () => execa.shell(`cd ${environment.environmentType} && npm install`)
      },
      {
        title: '🐳  Build docker image',
        task: () => execa.shell(`cd ${environment.environmentType} && docker build -t express-app:v1 .`)
      },
      {
        title: `🐳  Run docker container`,
        task: () => execa.shell('docker run --name express_app -p 4000:8080 -d express-app:v1')
      }

    ];

  return new Listr(tasks);
  }

  async addstyle(typeStyle: string) {}
}
