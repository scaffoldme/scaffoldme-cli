import { Environment } from "../interface/Environment";
import { Framework } from "../interface/Framework";
var shell = require("shelljs");
import * as chalk from "chalk";

export class React implements Framework {
  async generator(environment: Environment) {
    console.log(chalk.default.yellowBright(`Installation du Framework ${environment.framework.name} ( ${environment.environmentType} ) `));
    shell.mkdir('-p',`${environment.environmentType}`);
    /* if (
      shell.exec(
        `ng new ${environment.environmentType} --routing=true --style=${
          environment.style.name ? environment.style.name : "css"
        }`
      ).code == 0
    ) {
      console.log(chalk.default.green(`Installation ${environment.framework.name} Done !! `));
    } */
  }

  async addstyle(typeStyle: string) {}
}
