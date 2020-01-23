// import { displayNScaffoldmeInformation } from './infoAction'
import { MESSAGES, PROJECT_FILE } from "@scaffoldme/utils";
import chalk from "chalk";
// import { loadScaffoldmeJson } from "..";
import { Input } from "../input";
import { AbstractAction } from "./abstractAction";
const fs = require("fs");

export class InstallAction extends AbstractAction {
  /**
   * @param  {Input[]} inputs
   * @param  {Input[]} options
   */
  public async handle(inputs: Input[], options: Input[]) {
    console.log("install Action");

    await checkScaffoldmeJsonFile();
    console.log(this._project);

    //  console.log(await loadScaffoldmeJson());

    //console.log(this.project);

    // if (project.logo == "new project") process.exit(0);
  }
}

/**
 * Check if scaffoldme file exist
 */
const checkScaffoldmeJsonFile = async () => {
  try {
    if (!fs.existsSync(PROJECT_FILE)) {
      console.error(chalk.red(MESSAGES.SCAFFOLDME_JSON_FILE_NOT_EXIST));
      process.exit(0);
    }
  } catch (err) {
    console.error(chalk.red("ERROR"));
    process.exit(0);
  }
};
