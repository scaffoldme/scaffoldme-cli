import chalk from 'chalk';
import { CommanderStatic } from 'commander';
import { InstallCommand } from './commands/installCommand'
import { InstallAction } from './actions/installAction'
import { ERROR_PREFIX } from '@scaffoldme/utils'

export class Loader {
  public static load(program: CommanderStatic): void {
    new InstallCommand(new InstallAction()).load(program);
    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: CommanderStatic) {
    program.on('command:*', () => {
      console.error(
        `\n${ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`,
        program.args.join(' '),
      );
      console.log(
        `See ${chalk.red('--help')} for a list of available commands.\n`,
      );
      process.exit(1);
    });
  }
}