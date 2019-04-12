import * as chalk from "chalk";
import { Helper } from "./helper";
import { watcher } from "../utils/watcher";
const fs = require("fs");
const path = "scaffoldme.json";
import { Project } from "./interface/Project";
const jsonfile = require("jsonfile");

var shell = require("shelljs");

const execa = require('execa');
import Listr from 'listr';

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

  start(container_name:string): void {
    new Listr([
      {
        title: `Start docker container ${container_name}`,
        task: () => execa.shell(`docker start ${container_name}`)
      }
    ]).run();
    //console.log(chalk.default.green("start" + container_name));
  }

  stop(container_name:string): void {
    new Listr([
      {
        title: `Stop docker container ${container_name}`,
        task: () => execa.shell(`docker stop ${container_name}`)
      }
    ]).run();
    //console.log(chalk.default.green("start" + container_name));
  }

  restart(): void {
    console.log(chalk.default.green("restart"));
  }
}
