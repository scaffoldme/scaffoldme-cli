import { Loopback } from './generator/loopback';
import { Environment } from './interface/Environment';
import { Angular } from "./generator/angular";
import { React } from "./generator/React";
import { Express } from "./generator/Express";
var fs = require("fs");
const os = require("os");
import * as chalk from "chalk";
import { TechnologyName } from "./interface/Technology";
var shell = require("shelljs");


export class Helper {
  constructor(
    public angular: Angular = new Angular(),
    public react: React = new React(),
    public express: Express = new Express(),
    public loopback: Loopback = new Loopback()
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
        console.log(environment.framework.name);
        this.angular.generator(environment);
        break;

      case "Express":
        console.log(environment.framework.name);
        this.express.generator(environment)
        break;

      case "Loopback":
      console.log(environment.framework.name);
      //this.loopback.generator(environment)
      break;

      case "React":
        console.log(environment.framework.name);
        this.react.generator(environment)
        break;
    }
  }
}
