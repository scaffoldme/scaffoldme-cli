"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frontEnd = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("@scaffoldme/utils");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const fs = tslib_1.__importStar(require("fs"));
const angular_1 = require("../generator/angular");
var shell = require("shelljs");
const boxen = require("boxen");
class frontEnd {
    constructor(angular = new angular_1.Angular()) {
        this.angular = angular;
    }
    async install(environment) {
        // if (
        //   shell.exec(`git clone ${environment.depot} ${environment.name}`) !== 0
        // ) {
        shell.cd(environment.name);
        if (!fs.existsSync(utils_1.PROJECT_FILE)) {
            console.error(chalk_1.default.red(utils_1.MESSAGES.SCAFFOLDME_JSON_FILE_NOT_EXIST));
            process.exit(0);
        }
        const jsonScaffoldmeFrontEnd = JSON.parse(fs.readFileSync(utils_1.PROJECT_FILE, "utf8"));
        // console.log(jsonScaffoldmeFrontEnd.framework.technologyName);
        switch (jsonScaffoldmeFrontEnd.framework.technologyName) {
            case "Angular":
                //await this.installAngularFramework(jsonScaffoldmeFrontEnd);
                const loopback = this.angular.getListTask(jsonScaffoldmeFrontEnd);
                await loopback.run();
                await console.log(boxen("Powered with  💙 by scaffoldme team\nYour app runing at http://localhost:4200\nYour docker container name is : angular_app\nYour docker container image name is : angular-app:v1", { padding: 1, margin: 1, borderStyle: "double" }));
                shell.cd("..");
                break;
            case "React":
                // await this.installReactFramework();
                shell.cd("..");
                break;
            default:
                console.log(chalk_1.default.red(`${jsonScaffoldmeFrontEnd.framework.technologyName} is not supported right now`));
                process.exit();
        }
        // }
    }
}
exports.frontEnd = frontEnd;
