import { Environment } from "../interface/Environment";
import { Framework } from "../interface/Framework";
var shell = require("shelljs");
import * as chalk from "chalk";

export class Express implements Framework {
  async generator(environment: Environment) {
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
  }

  async addstyle(typeStyle: string) {}
}
