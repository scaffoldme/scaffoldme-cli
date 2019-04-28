import chalk from 'chalk';
import * as program from 'commander';
import * as fs from 'fs';
import { fileName } from '../constant';
import { ICommand } from '../definition';

export class ProjectCommand implements ICommand {
  public commands() {
    program
      .command('init')
      .alias('i')
      .description('Initialization of the project')
      .action(() => this.run());
  }

  public async run() {
    if (!fs.existsSync(`./${fileName}`)) {
      console.log(chalk.red('Le fichier scaffoldme.json est introuvable'));
    }
  }
}
