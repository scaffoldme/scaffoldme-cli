import { Command, CommanderStatic } from "commander";
import { Input } from "../input";
//import { Collection } from '../lib/schematics';
import { AbstractCommand } from "./abstractCommand";

export class StartContainerCommand extends AbstractCommand {
  /**
   * load install command
   * @param  {CommanderStatic} program
   */
  public load(program: CommanderStatic) {
    program
      .command("start <container_name>")
      .alias("str")
      .description("Start container")
      .action(async (container_name: string, command: Command) => {
        const options: Input[] = [];
        /* options.push({
          name: "language",
          value: !!command.language ? command.language : "ts",
        }); */

        const inputs: Input[] = [];
        inputs.push({ name: "container_name", value: container_name });

        // const project: Project | undefined = await loadScaffoldmeJson()

        await this.action.handle(inputs, options);
      });
  }
}
