"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstallCommand = void 0;
//import { Collection } from '../lib/schematics';
const abstractCommand_1 = require("./abstractCommand");
class InstallCommand extends abstractCommand_1.AbstractCommand {
    /**
     * load install command
     * @param  {CommanderStatic} program
     */
    load(program) {
        program
            .command("init")
            .alias("i")
            .description("Install Scaffoldme application with Json File run watch")
            /* .option(
              '-d, --dry-run',
              'Allow to test changes before executing the command',
            )
            .option('-g, --skip-git', 'Allow to skip git repository initialization')
            .option('-s, --skip-install', 'Allow to skip packages installation')
            .option(
              '-p, --package-manager [package-manager]',
              'Allow to specify package manager to skip package-manager selection',
            )
            .option(
              '-l, --language [language]',
              'Language that shall be used (TS or JS)',
            )
            .option(
              '-c, --collection [collectionName]',
              'Collection that shall be used',
            ) */
            .action(async (name) => {
            const options = [];
            // options.push({
            //   name: "language",
            //   value: !!command.language ? command.language : "ts",
            // });
            const inputs = [];
            inputs.push({ name: "name", value: name });
            // const project: Project | undefined = await loadScaffoldmeJson()
            await this.action.handle(inputs, options);
        });
    }
}
exports.InstallCommand = InstallCommand;
