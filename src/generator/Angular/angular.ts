import { exec } from 'child_process';
import { Environment } from "./../../interface/Environment";
import { Framework } from "./../../interface/Framework";
import { watcher } from "../../../utils/watcher";
var shell = require("shelljs");
import * as chalk from "chalk";

export class Angular implements Framework {
  async generator(environment: Environment) {
    /* watcher(`📦  Installation du Framework ${environment.framework.name}`,`ng new ${environment.environmentType} --routing=false --style=${
      environment.style.name ? environment.style.name : "css"
    }`); */

    watcher(
      `📦  Installation du Framework ${environment.framework.name}`,
      `git clone https://github.com/scaffoldme/angular-starter.git ${
        environment.environmentType
      }`
    );

    /**update Dependencies */
    shell.cd(`${environment.environmentType}`);
    shell.exec('npm install')
    watcher('📦  update Dependencies', 'npm i ajv --save');

     /**Build docker image */
     watcher('📦  Build image docker', 'docker build -t angular-app:v1 .');

    /**Runing docker image */
    watcher('📦  Run image docker', 'docker run -p 4200:80 -d angular-app:v1');

    console.log(chalk.default.green(`your ${environment.environmentType} running at http://localhost:4200`));

  }

  async addstyle(typeStyle: string) {}
}
