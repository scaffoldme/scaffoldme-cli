"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopContainerCommand = void 0;
//import { Collection } from '../lib/schematics';
const abstractCommand_1 = require("./abstractCommand");
class StopContainerCommand extends abstractCommand_1.AbstractCommand {
    /**
     * load install command
     * @param  {CommanderStatic} program
     */
    load(program) {
        program
            .command("stop <container_name>")
            .alias("stp")
            .description("Stop container")
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
exports.StopContainerCommand = StopContainerCommand;
