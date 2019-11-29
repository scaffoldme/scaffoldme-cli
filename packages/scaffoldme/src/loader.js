"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const installCommand_1 = require("./commands/installCommand");
const scaffoldme_core_1 = require("@scaffoldme-cli/scaffoldme-core");
const ERROR_PREFIX = "bim";
class Loader {
    static load(program) {
        new installCommand_1.InstallCommand(new scaffoldme_core_1.InstallAction()).load(program);
        this.handleInvalidCommand(program);
    }
    static handleInvalidCommand(program) {
        program.on('command:*', () => {
            console.error(`\n${ERROR_PREFIX} Invalid command: ${chalk_1.default.red('%s')}`, program.args.join(' '));
            console.log(`See ${chalk_1.default.red('--help')} for a list of available commands.\n`);
            process.exit(1);
        });
    }
}
exports.Loader = Loader;
//# sourceMappingURL=loader.js.map