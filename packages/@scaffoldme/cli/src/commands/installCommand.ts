import { CommanderStatic } from "commander";
import { Input } from "../input";
//import { Collection } from '../lib/schematics';
import { AbstractCommand } from "./abstractCommand";

export class InstallCommand extends AbstractCommand {
  /**
   * load install command
   * @param  {CommanderStatic} program
   */
  public load(program: CommanderStatic) {
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
      .action(async (name: string) => {
        const options: Input[] = [];
        // options.push({
        //   name: "language",
        //   value: !!command.language ? command.language : "ts",
        // });

        const inputs: Input[] = [];
        inputs.push({ name: "name", value: name });

        // const project: Project | undefined = await loadScaffoldmeJson()

        await this.action.handle(inputs, options);
      });
  }
}
