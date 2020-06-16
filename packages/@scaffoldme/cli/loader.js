"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("@scaffoldme/utils");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const installAction_1 = require("./actions/installAction");
const startContainerAction_1 = require("./actions/startContainerAction");
const stopContainerAction_1 = require("./actions/stopContainerAction");
const installCommand_1 = require("./commands/installCommand");
const startContainerCommand_1 = require("./commands/startContainerCommand");
const stopContainerCommand_1 = require("./commands/stopContainerCommand");
class Loader {
    static async load(program) {
        // const project = await loadScaffoldmeJson();
        new installCommand_1.InstallCommand(new installAction_1.InstallAction()).load(program);
        new startContainerCommand_1.StartContainerCommand(new startContainerAction_1.StartContainerAction()).load(program);
        new stopContainerCommand_1.StopContainerCommand(new stopContainerAction_1.StopContainerAction()).load(program);
        this.handleInvalidCommand(program);
    }
    /**
     * check inalid command and return error
     * @param  {CommanderStatic} program
     */
    static handleInvalidCommand(program) {
        program.on("command:*", () => {
            console.error(`\n${utils_1.ERROR_PREFIX} Invalid command: ${chalk_1.default.red("%s")}`, program.args.join(" "));
            console.log(`See ${chalk_1.default.red("--help")} for a list of available commands.\n`);
            process.exit(1);
        });
    }
}
exports.Loader = Loader;
