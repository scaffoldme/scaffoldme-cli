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
          chalk.default.red("Le fichier scaffoldme.json est introuvable")
        );
        return;
      }
      const projectJSON: Project = await jsonfile.readFile(`${path}`);
      shell.echo('');
      console.log(chalk.default.yellowBright('  ⏳  Initialisation du projet : ' + (projectJSON.name ? projectJSON.name : 'Scafoldme Project')));
      shell.echo('');
      shell.echo("  🕓  Prenez un café ☕ et patientez pendant l'installation ... ");
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
