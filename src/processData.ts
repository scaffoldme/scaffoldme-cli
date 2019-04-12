import * as chalk from "chalk";
import { Helper } from "./helper";
import { watcher } from "../utils/watcher";
const fs = require("fs");
const path = "scaffoldme.json";
import { Project } from "./interface/Project";
const jsonfile = require("jsonfile");

var shell = require("shelljs");

export class ProcessData {
  constructor(
    public fileHelper: Helper = new Helper(),
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
      shell.echo('  ⏳  Initialisation du projet : ' + (projectJSON.name ? projectJSON.name : 'Scafoldme Project'));
      shell.echo('');
      shell.echo('  🕓  The setup process can take few minutes.');
      shell.echo('');
      await this.helper.getFrameworkAndInstall(projectJSON.environments);
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
