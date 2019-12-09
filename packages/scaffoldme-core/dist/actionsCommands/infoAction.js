"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const chalk_1 = require("chalk");
// import { platform, release } from 'os';
// import osName = require('os-name');
const path_1 = require("path");
const abstractAction_1 = require("./abstractAction");
const messages_1 = require("@scaffoldme-cli/scaffoldme-utils/lib/ui/messages");
// import { InfoA } from '@scaffoldme-cli/scaffoldme-core'
class InfoAction extends abstractAction_1.AbstractAction {
    async handle() {
        // await displayNestInformation();
    }
}
exports.InfoAction = InfoAction;
exports.displayNScaffoldmeInformation = async () => {
    console.info(chalk_1.default.green('[Nest Information]'));
    try {
        const dependencies = await readProjectPackageJsonDependencies();
        // displayNestVersions(dependencies);
        console.log(dependencies);
    }
    catch (_a) {
        console.error(chalk_1.default.red(messages_1.MESSAGES.NEST_INFORMATION_PACKAGE_MANAGER_FAILED));
    }
};
const readProjectPackageJsonDependencies = async () => {
    return new Promise((resolve, reject) => {
        fs_1.readFile(path_1.join(process.cwd(), 'package.json'), (error, buffer) => {
            if (error !== undefined && error !== null) {
                reject(error);
            }
            else {
                resolve(JSON.parse(buffer.toString()).dependencies);
            }
        });
    });
};
//# sourceMappingURL=infoAction.js.map