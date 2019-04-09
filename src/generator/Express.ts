import { Environment } from "../interface/Environment";
import { Framework } from "../interface/Framework";
var shell = require("shelljs");
import * as chalk from "chalk";

export class Express implements Framework {
  async generator(environment: Environment) {
    console.log(chalk.default.yellowBright(`Installation du Framework ${environment.framework.name}`));
    shell.mkdir('-p',`${environment.environmentType}`);
    /* console.log(chalk.default.green(`Installation du  ${environment.environmentType}`));
    if (
      shell.exec(
        `ng new ${environment.environmentType} --routing=true --style=${
          environment.style.name ? environment.style.name : "css"
        }`
      ).code == 0
    ) {
      console.log(chalk.default.green(`Installation ${name} Done !! `));
    } */
  }

  async addstyle(typeStyle: string) {}
}
