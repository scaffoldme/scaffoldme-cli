"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// import { displayNScaffoldmeInformation } from './infoAction'
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const environment_1 = require("../lib/environment");
const project_1 = require("../lib/project");
const abstractAction_1 = require("./abstractAction");
const ora = require("ora");
class InstallAction extends abstractAction_1.AbstractAction {
    /**
     * @param  {Input[]} inputs
     * @param  {Input[]} options
     */
    async handle(inputs, options) {
        const project = new project_1.Project();
        const environment = new environment_1.Environment();
        project.load();
        //const spinner = ora('Loading unicorns').start();
        const spinner = ora(chalk_1.default.yellowBright("Setup project progress .... ")).start();
        console.info();
        // spinner.start();
        try {
            const environments = project.getEnvironments();
            for (let index = 0; index < environments.length; index++) {
                // console.log(environments[index]);
                await environment.install(environments[index], inputs, options);
            }
            spinner.succeed("Steup project done !");
        }
        catch (_a) {
            console.info("failed");
            spinner.fail();
        }
        /* const environments = project.getEnvironments();
        for (let index = 0; index < environments.length; index++) {
          console.log(environments[index]);
        } */
    }
}
exports.InstallAction = InstallAction;
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
