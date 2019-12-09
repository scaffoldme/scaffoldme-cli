"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstractAction_1 = require("./abstractAction");
const infoAction_1 = require("./infoAction");
const messages_1 = require("@scaffoldme-cli/scaffoldme-utils/lib/ui/messages");
const constants_1 = require("@scaffoldme-cli/scaffoldme-utils/constants");
const chalk_1 = require("chalk");
const fs = require("fs");
class InstallAction extends abstractAction_1.AbstractAction {
    async handle(inputs, options) {
        console.log('input ----', inputs);
        console.log('options -----', options);
        await infoAction_1.displayNScaffoldmeInformation();
        await checkScaffoldmeJsonFile();
        process.exit(0);
    }
}
exports.InstallAction = InstallAction;
const checkScaffoldmeJsonFile = async () => {
    try {
        if (!fs.existsSync(constants_1.PROJECT_FILE)) {
            console.error(chalk_1.default.red(messages_1.MESSAGES.SCAFFOLDME_JSON_FILE_NOT_EXIST));
        }
    }
    catch (err) {
        console.error(chalk_1.default.red("ERROR"));
    }
};
//# sourceMappingURL=installAction.js.map