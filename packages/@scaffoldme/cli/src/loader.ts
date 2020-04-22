import { ERROR_PREFIX } from "@scaffoldme/utils";
import chalk from "chalk";
import { CommanderStatic } from "commander";
import { InstallAction } from "./actions/installAction";
import { StartContainerAction } from "./actions/startContainerAction";
import { StopContainerAction } from "./actions/stopContainerAction";
import { InstallCommand } from "./commands/installCommand";
import { StartContainerCommand } from "./commands/startContainerCommand";
import { StopContainerCommand } from "./commands/stopContainerCommand";

export class Loader {
  public static async load(program: CommanderStatic): Promise<void> {
    // const project = await loadScaffoldmeJson();
    new InstallCommand(new InstallAction()).load(program);
    new StartContainerCommand(new StartContainerAction()).load(program);
    new StopContainerCommand(new StopContainerAction()).load(program);

    this.handleInvalidCommand(program);
  }
  /**
   * check inalid command and return error
   * @param  {CommanderStatic} program
   */
  private static handleInvalidCommand(program: CommanderStatic) {
    program.on("command:*", () => {
      console.error(
        `\n${ERROR_PREFIX} Invalid command: ${chalk.red("%s")}`,
        program.args.join(" ")
      );
      console.log(
        `See ${chalk.red("--help")} for a list of available commands.\n`
      );
      process.exit(1);
    });
  }
}
