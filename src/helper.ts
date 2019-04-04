
import { Environment } from './interface/Environment';
import { Angular } from "./generator/angular";
var fs = require("fs");
const os = require("os");
import * as chalk from "chalk";
import { TechnologyName } from "./interface/Technology";
var shell = require("shelljs");

export class Helper {
  constructor(
    public angular: Angular = new Angular()
  ) {}

  /**
   * crée un dossier ( repertoire ) s'il n'existe pas
   * @param name nom du repertoire
   */
  async createDirectory(name: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      fs.mkdir(name, (err: any) => {
        if (err) reject(err);
        else resolve();
      });
    }).then(
      () => true,
      err => {
        if (err.code == "EEXIST") return false;
        else throw err;
      }
    );
  }

  /**
   * Changer les permissions d'un dossier
   * @param name nom du repertoire
   */
  async updatePermissionFolder(name: string) {
    shell.chmod(755, name);
  }

  /**
   * Faire un switch sur le nom de l'environnement
   * Crée l'environnement en fonction du type
   * @param environment TypeEnvironment
   */
  async getFrameworkAndInstall(environment : Environment) {

    switch (environment.framework.name) {
      case "Angular":
        this.angular.generator(environment);
        break;
      case "React":
        console.log("reacttttttttttttttttt");
        break;
    }
  }
}
