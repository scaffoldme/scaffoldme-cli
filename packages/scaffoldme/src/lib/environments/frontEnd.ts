import { EnvironmentInfosWithRelations, FrontEnd } from "@scaffoldme/core";
import { MESSAGES, PROJECT_FILE } from "@scaffoldme/utils";
import chalk from "chalk";
import * as fs from "fs";
var shell = require("shelljs");

export class frontEnd {
  public static async install(environment: EnvironmentInfosWithRelations) {
    if (
      shell.exec(`git clone ${environment.depot} ${environment.name}`) !== 0
    ) {
      shell.cd(environment.name);
      if (!fs.existsSync(PROJECT_FILE)) {
        console.error(chalk.red(MESSAGES.SCAFFOLDME_JSON_FILE_NOT_EXIST));
        process.exit(0);
      }
      const jsonScaffoldmeFrontEnd: FrontEnd = JSON.parse(
        fs.readFileSync(PROJECT_FILE, "utf8")
      );
      switch (jsonScaffoldmeFrontEnd.framework.technologyName) {
        case "Angular":
          await this.installAngularFramework(jsonScaffoldmeFrontEnd);
          break;
        case "React":
          await this.installReactFramework();
          break;

        default:
          console.log(
            chalk.red(
              `${jsonScaffoldmeFrontEnd.framework.technologyName} is not supported right now`
            )
          );
          process.exit();
      }
    }
  }

  private static async installAngularFramework(front: FrontEnd) {
    if (front.framework.versionId ?? front.framework.versionId === "8.0.0") {
      console.log(
        chalk.yellowBright(
          `Installation du Framework ${front.framework.technologyName} `
        )
      );
      const { stdout, stderr } = await shell.exec(
        "/home/mahamadou/Documents/Projects/ETNA/scaffoldme-cli/packages/scaffoldme/node_modules/.bin/schematics @scaffoldme/schematics:loopback/application"
      );
      console.log({ stdout, stderr });

      // shell.mkdir("-p", `${front.framework.technologyName}`);
    } else {
      console.log(
        chalk.red(`Version ${front.framework.versionId} is not supported`)
      );
    }
  }
  private static async installReactFramework() {
    console.log("install react");
  }
}