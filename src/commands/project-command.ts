import chalk from 'chalk';
import * as program from 'commander';
import { Project } from '../models/project';
import { EnvironmentCommand } from './environment-command';

export class ProjectCommand {

  public commands() {
    program
      .command('init')
      .alias('i')
      .description('Initialization of the project')
      .action(() => this.install());
  }

  /**
   * Installs the project in the current folder. A folder is created for each environment with a docker container.
   */
  private async install(): Promise<void> {
    const project = new Project();
    project.load();
    console.log(chalk.yellowBright(
      '  ⏳  Initialization of the project : ' + project.getProjectName() + '\n\n')
    );
    console.log('  🕓  Have a coffee and wait during the installation... \n');

    const environments = project.getEnvironments();
    for (let index = 0; index < environments.length; index++) {
      await EnvironmentCommand.install(environments[index]);
    }
  }

}
