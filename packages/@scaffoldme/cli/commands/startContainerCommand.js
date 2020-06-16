"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartContainerCommand = void 0;
//import { Collection } from '../lib/schematics';
const abstractCommand_1 = require("./abstractCommand");
class StartContainerCommand extends abstractCommand_1.AbstractCommand {
    /**
     * load install command
     * @param  {CommanderStatic} program
     */
    load(program) {
        program
            .command("start <container_name>")
            .alias("str")
            .description("Start container")
            .action(async (container_name, command) => {
            const options = [];
            /* options.push({
              name: "language",
              value: !!command.language ? command.language : "ts",
            }); */
            const inputs = [];
            inputs.push({ name: "container_name", value: container_name });
            // const project: Project | undefined = await loadScaffoldmeJson()
            await this.action.handle(inputs, options);
        });
    }
}
exports.StartContainerCommand = StartContainerCommand;
