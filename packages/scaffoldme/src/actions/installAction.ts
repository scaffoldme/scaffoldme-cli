// import { displayNScaffoldmeInformation } from './infoAction'
import chalk from "chalk";
import { Input } from "../input";
import { Environment } from "../lib/environment";
import { Project } from "../lib/project";
import { AbstractAction } from "./abstractAction";
const ora = require("ora");

export class InstallAction extends AbstractAction {
  /**
   * @param  {Input[]} inputs
   * @param  {Input[]} options
   */
  public async handle(inputs: Input[], options: Input[]) {
    const project = new Project();
    const environment = new Environment();
    project.load();

    //const spinner = ora('Loading unicorns').start();
    const spinner = ora(
      chalk.yellowBright("Setup project progress .... ")
    ).start();
    console.info();
    // spinner.start();
    try {
      const environments = project.getEnvironments();
      for (let index = 0; index < environments.length; index++) {
        // console.log(environments[index]);
        await environment.install(environments[index], inputs, options);
      }
      spinner.succeed("Steup project done !");
    } catch {
      console.info("failed");
      spinner.fail();
    }

    /* const environments = project.getEnvironments();
    for (let index = 0; index < environments.length; index++) {
      console.log(environments[index]);
    } */
  }
}

/**
 * Check if scaffoldme file exist
/*  
**
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
 */
