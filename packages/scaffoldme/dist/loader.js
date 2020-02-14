"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("@scaffoldme/utils");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const installAction_1 = require("./actions/installAction");
const installCommand_1 = require("./commands/installCommand");
class Loader {
    static async load(program) {
        // const project = await loadScaffoldmeJson();
        new installCommand_1.InstallCommand(new installAction_1.InstallAction()).load(program);
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
