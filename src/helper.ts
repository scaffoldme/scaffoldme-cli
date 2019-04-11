import { Loopback } from './generator/loopback';
import { Environment } from './interface/Environment';
import { Angular } from "./generator/Angular/angular";
import { React } from "./generator/React";
import { Express } from "./generator/Express";
var fs = require("fs");
var shell = require("shelljs");
const boxen = require('boxen');


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
  async getFrameworkAndInstall(environments : Environment[]) {

    for (let index = 0; index < environments.length; index++) {
      const environment = environments[index];

      switch (environment.framework.name) {
        case "Angular":
          const angular =   this.angular.getListTask(environment);
          await angular.run();
          await console.log(boxen('Powered with  💙 by scaffoldme team\nYour app runing at http://localhost:4200\nYour docker container image name is : angular-app:v1', {padding: 1, margin: 1, borderStyle: 'double'}));
          break;

        case "Express":
          console.log(environment.framework.name);
          this.express.generator(environment)
          break;

        case "Loopback":
        const loopback = this.loopback.getListTask(environment)
        await loopback.run();
        await console.log(boxen('Powered with  💙 by scaffoldme team\nYour app runing at http://localhost:3000\nYour docker container image name is : loopback-app:v1', {padding: 1, margin: 1, borderStyle: 'double'}));
        break;

        case "React":
          console.log(environment.framework.name);
          this.react.generator(environment)
          break;
      }

    }
}
}
