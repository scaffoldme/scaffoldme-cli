"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const emojis_1 = require("./emojis");
exports.MESSAGES = {
    PROJECT_SELECTION_QUESTION: 'Which project would you like to generate to?',
    DRY_RUN_MODE: 'Command has been executed in the dry mode, nothing changed!',
    PROJECT_INFORMATION_START: `${emojis_1.EMOJIS.ZAP}  We will scaffold your app in a few seconds..`,
    RUNNER_EXECUTION_ERROR: (command) => `\nFailed to execute command: ${command}`,
    PACKAGE_MANAGER_QUESTION: `Which package manager would you ${emojis_1.EMOJIS.HEART}  to use?`,
    PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS: `Installation in progress... ${emojis_1.EMOJIS.COFFEE}`,
    PACKAGE_MANAGER_UPDATE_IN_PROGRESS: `Installation in progress... ${emojis_1.EMOJIS.COFFEE}`,
    PACKAGE_MANAGER_UPGRADE_IN_PROGRESS: `Installation in progress... ${emojis_1.EMOJIS.COFFEE}`,
    GIT_INITIALIZATION_ERROR: 'Git repository has not been initialized',
    PACKAGE_MANAGER_INSTALLATION_SUCCEED: (name) => name !== '.'
        ? `${emojis_1.EMOJIS.ROCKET}  Successfully created project ${chalk_1.default.green(name)}`
        : `${emojis_1.EMOJIS.ROCKET}  Successfully created a new project`,
    GET_STARTED_INFORMATION: `${emojis_1.EMOJIS.POINT_RIGHT}  Get started with the following commands:`,
    CHANGE_DIR_COMMAND: (name) => `$ cd ${name}`,
    START_COMMAND: (name) => `$ ${name} run start`,
    PACKAGE_MANAGER_INSTALLATION_FAILED: `${emojis_1.EMOJIS.SCREAM}  Packages installation failed, see above`,
    // tslint:disable-next-line:max-line-length
    NEST_INFORMATION_PACKAGE_MANAGER_FAILED: `${emojis_1.EMOJIS.SMIRK}  cannot read your project package.json file, are you inside your project directory?`,
    SCAFFOLDME_JSON_FILE_NOT_EXIST: `scafoldme.json file was not found`
};