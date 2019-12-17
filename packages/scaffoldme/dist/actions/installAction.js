"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@scaffoldme/core");
// import { displayNScaffoldmeInformation } from './infoAction'
const utils_1 = require("@scaffoldme/utils");
const chalk_1 = require("chalk");
const fs = require("fs");
class InstallAction extends core_1.AbstractAction {
    /**
     * @param  {Input[]} inputs
     * @param  {Input[]} options
     */
    async handle(inputs, options) {
        //console.log('input ----', inputs);
        //console.log('options -----', options);
        // await displayNScaffoldmeInformation();
        await checkScaffoldmeJsonFile();
        console.log('la suite');
        process.exit(0);
    }
}
exports.InstallAction = InstallAction;
/**
 * Check if scaffoldme file exist
 */
const checkScaffoldmeJsonFile = async () => {
    try {
        if (!fs.existsSync(utils_1.PROJECT_FILE)) {
            console.error(chalk_1.default.red(utils_1.MESSAGES.SCAFFOLDME_JSON_FILE_NOT_EXIST));
            process.exit(0);
        }
    }
    catch (err) {
        console.error(chalk_1.default.red("ERROR"));
        process.exit(0);
    }
};
