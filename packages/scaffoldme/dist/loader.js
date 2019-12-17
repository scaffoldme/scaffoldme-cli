"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const installCommand_1 = require("./commands/installCommand");
const installAction_1 = require("./actions/installAction");
const utils_1 = require("@scaffoldme/utils");
class Loader {
    static load(program) {
        new installCommand_1.InstallCommand(new installAction_1.InstallAction()).load(program);
        this.handleInvalidCommand(program);
    }
    /**
     * check inalid command and return error
     * @param  {CommanderStatic} program
     */
    static handleInvalidCommand(program) {
        program.on('command:*', () => {
            console.error(`\n${utils_1.ERROR_PREFIX} Invalid command: ${chalk_1.default.red('%s')}`, program.args.join(' '));
            console.log(`See ${chalk_1.default.red('--help')} for a list of available commands.\n`);
            process.exit(1);
        });
    }
}
exports.Loader = Loader;
