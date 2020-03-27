"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("@scaffoldme/utils");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const fs = tslib_1.__importStar(require("fs"));
var shell = require("shelljs");
class frontEnd {
    static async install(environment) {
        if (shell.exec(`git clone ${environment.depot} ${environment.name}`) !== 0) {
            shell.cd(environment.name);
            if (!fs.existsSync(utils_1.PROJECT_FILE)) {
                console.error(chalk_1.default.red(utils_1.MESSAGES.SCAFFOLDME_JSON_FILE_NOT_EXIST));
                process.exit(0);
            }
            const jsonScaffoldmeFrontEnd = JSON.parse(fs.readFileSync(utils_1.PROJECT_FILE, "utf8"));
            switch (jsonScaffoldmeFrontEnd.framework.technologyName) {
                case "Angular":
                    await this.installAngularFramework(jsonScaffoldmeFrontEnd);
                    break;
                case "React":
                    await this.installReactFramework();
                    break;
                default:
                    console.log(chalk_1.default.red(`${jsonScaffoldmeFrontEnd.framework.technologyName} is not supported right now`));
                    process.exit();
            }
        }
    }
    static async installAngularFramework(front) {
        var _a;
        if (_a = front.framework.versionId, (_a !== null && _a !== void 0 ? _a : front.framework.versionId === "8.0.0")) {
            console.log(chalk_1.default.yellowBright(`Installation du Framework ${front.framework.technologyName} `));
            const { stdout, stderr } = await shell.exec("/home/mahamadou/Documents/Projects/ETNA/scaffoldme-cli/packages/scaffoldme/node_modules/.bin/schematics @scaffoldme/schematics:loopback/application");
            console.log({ stdout, stderr });
            // shell.mkdir("-p", `${front.framework.technologyName}`);
        }
        else {
            console.log(chalk_1.default.red(`Version ${front.framework.versionId} is not supported`));
        }
    }
    static async installReactFramework() {
        console.log("install react");
    }
}
exports.frontEnd = frontEnd;
