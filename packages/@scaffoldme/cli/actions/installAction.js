"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstallAction = void 0;
const tslib_1 = require("tslib");
// import { displayNScaffoldmeInformation } from './infoAction'
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const environment_1 = require("../lib/environment");
const project_1 = require("../lib/project");
const abstractAction_1 = require("./abstractAction");
var shell = require("shelljs");
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
        /* const spinner = ora(
          chalk.yellowBright("Setup project progress .... ")
        ).start(); */
        console.log(chalk_1.default.yellowBright("Setup project progress .... "));
        console.info();
        shell.echo("");
        shell.echo("Prenez un café ☕ et patientez pendant l'installation ... ");
        shell.echo("");
        try {
            const environments = project.getEnvironments();
            for (let index = 0; index < environments.length; index++) {
                // console.log(environments[index]);
                await environment.install(environments[index]);
            }
            console.log(chalk_1.default.greenBright("Setup project done ! "));
        }
        catch (_a) {
            console.info("failed");
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
