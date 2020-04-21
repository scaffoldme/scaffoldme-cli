import {
  EnvironmentInfosWithRelations,
  ProjectInfosWithRelations
} from "@scaffoldme/core";
import { MESSAGES, PROJECT_FILE } from "@scaffoldme/utils";
import chalk from "chalk";
import * as fs from "fs";

export class Project {
  private data: ProjectInfosWithRelations;

  constructor() {
    this.data = {
      name: "",
      description: ""
    };
  }

  public load(): void {
    if (!fs.existsSync(PROJECT_FILE)) {
      console.error(chalk.red(MESSAGES.SCAFFOLDME_JSON_FILE_NOT_EXIST));
      process.exit(0);
    }
    this.data = JSON.parse(fs.readFileSync(PROJECT_FILE, "utf8"));
  }

  public getProjectName(): string {
    if (this.data && this.data.name) {
      return this.data.name;
    } else {
      return "Scafoldme Project";
    }
  }

  public getEnvironments(): EnvironmentInfosWithRelations[] {
    return this.data.environmentsInfos || [];
  }
}
