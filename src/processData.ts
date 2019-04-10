import * as chalk from "chalk";
import { ParserData } from "./parserData";
import { Helper } from "./helper";
import { Angular } from "./generator/angular";
import { Loopback } from "./generator/loopback";
import { watcher } from "../utils/watcher";
const fs = require("fs");

const path = "scafoldme.json";

import { Project } from "./interface/Project";
import { Environment } from './interface/Environment';
const jsonfile = require("jsonfile");

export class ProcessData {
  constructor(
    public fileHelper: Helper = new Helper(),
    public parseData: ParserData = new ParserData(),
    public angular: Angular = new Angular(),
    public loopback: Loopback = new Loopback(),
    public helper: Helper = new Helper()
  ) {}

  async init(): Promise<void> {
    fs.access(`./${path}`, fs.F_OK, async (err: any) => {
      if (err) {
        console.log(
          chalk.default.red("Le fichier scafoldme.json est introuvable")
        );
        return;
      }
      const projectJSON: Project = await jsonfile.readFile(`${path}`);
      watcher('🕓   Initialisation du projet : ' + (projectJSON.name ? projectJSON.name : 'Scafoldme Project'));
      projectJSON.environments.forEach(item => {
        if (!item.environmentType) {
          console.log(
            chalk.default.red("Erreur ! Le type d'environnement n'est pas defini")
          );
          return;
        }
        if (!item.framework) {
          console.log(
            chalk.default.red("Erreur ! Le Framework n'est pas defini")
          );
          return;
        }
         this.helper.getFrameworkAndInstall(item);

      });

    });
  }

  add(data: any): void {
    console.log(chalk.default.green("add"));
    console.log(data);
  }

  update(): void {
    console.log(chalk.default.green("update"));
  }

  start(): void {
    console.log(chalk.default.green("start"));
  }

  restart(): void {
    console.log(chalk.default.green("restart"));
  }
}
