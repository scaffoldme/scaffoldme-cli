import { Environment } from "./../interface/Environment";
import { Framework } from "./../interface/Framework";
import { watcher } from "../../utils/watcher";
var shell = require("shelljs");
import * as chalk from "chalk";

export class Angular implements Framework {
  async generator(environment: Environment) {
    watcher(`📦  Installation du Framework ${environment.framework.name}`,`ng new ${environment.environmentType} --routing=false --style=${
      environment.style.name ? environment.style.name : "css"
    }`);

  }

  async addstyle(typeStyle: string) {}
}
