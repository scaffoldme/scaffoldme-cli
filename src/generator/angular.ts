import { Environment } from "./../interface/Environment";
import { Framework } from "./../interface/Framework";
var shell = require("shelljs");
import * as chalk from "chalk";

export class Angular implements Framework {
  async generator(environment: Environment) {
    console.log(chalk.default.yellowBright(`Installation du Framework ${environment.framework.name} ( ${environment.environmentType} )`));
    if (
      shell.exec(
        `ng new ${environment.environmentType} --routing=false --style=${
          environment.style.name ? environment.style.name : "css"
        }`
      ).code == 0
    ) {
      console.log(chalk.default.green(`Installation ${environment.framework.name} Done !! `));
    }

    /*console.log(chalk.default.yellow(`Updating package.json `));
      const packageJSON: packageJSON = await jsonfile.readFile(`./${dirnames.FILE}`);
      packageJSON.scripts.haakily =
      "openapi-generator generate -i ./haakily.json -g typescript-angular -o generated-sources/openapi --additional-properties='ngVersion=6.1.7'";
      await jsonfile.writeFile(`./${dirnames.FILE}`, packageJSON);
      console.log(chalk.default.green(`package.json Updated`));
      shell.cd('..'); */
  }

  async addstyle(typeStyle: string) {}
}
