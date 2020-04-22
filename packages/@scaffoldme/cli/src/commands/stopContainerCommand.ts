import { Command, CommanderStatic } from "commander";
import { Input } from "../input";
//import { Collection } from '../lib/schematics';
import { AbstractCommand } from "./abstractCommand";

export class StopContainerCommand extends AbstractCommand {
  /**
   * load install command
   * @param  {CommanderStatic} program
   */
  public load(program: CommanderStatic) {
    program
      .command("stop <container_name>")
      .alias("stp")
      .description("Stop container")
      .action(async (container_name: string, command: Command) => {
        const options: Input[] = [];
        options.push({
          name: "language",
          value: !!command.language ? command.language : "ts",
        });

        const inputs: Input[] = [];
        inputs.push({ name: "container_name", value: container_name });

        // const project: Project | undefined = await loadScaffoldmeJson()

        await this.action.handle(inputs, options);
      });
  }
}
