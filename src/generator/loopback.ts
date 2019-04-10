import { Framework } from "./../interface/Framework";
import { Environment } from "../interface/Environment";
import { watcher } from "../../utils/watcher";

var shell = require("shelljs");
import * as chalk from "chalk";

const pwdStdout = shell.exec("pwd").stdout;
const pwd = pwdStdout.replace(/\n/g, "");

export class Loopback implements Framework {
  async generator(environment: Environment) {
    watcher(
      `📦  Installation du Framework ${environment.framework.name}`,
      `git clone https://github.com/scaffoldme/Loopback-Starter.git ${
        environment.environmentType
      }`
    );

    /**Install dependencies */
    shell.cd(`${environment.environmentType}`);
    watcher('📦  Install dependencies', 'npm i');

    /**Build docker image */
     watcher('📦  Build image docker', 'docker build -t loopback .');

    /**Runing docker image */
    watcher('📦  Run image docker', 'docker run -p 3000:3000 -d loopback');

    console.log(chalk.default.green(`your ${environment.environmentType} running at http://localhost:3000`));

  }

  async addstyle(typeStyle: string) {}
}
