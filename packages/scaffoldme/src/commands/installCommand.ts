import { Command, CommanderStatic } from 'commander';
//import { Collection } from '../lib/schematics';
import { AbstractCommand } from './abstractCommand';
import { Input } from '../input';

export class InstallCommand extends AbstractCommand {

  /**
   * load install command
   * @param  {CommanderStatic} program
   */
  public load(program: CommanderStatic) {
    program
      .command('install [name] ')
      .alias('i')
      .description('Install Scaffoldme application with Json File')
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
      .action(async (name: string, command: Command) => {
        const options: Input[] = [];
        options.push({
          name: 'language',
          value: !!command.language ? command.language : 'ts',
        });

        const inputs: Input[] = [];
        inputs.push({ name: 'name', value: name });

        await this.action.handle(inputs, options);
      });
  }
}
