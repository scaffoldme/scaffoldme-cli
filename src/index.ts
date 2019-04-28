#!/usr/bin/env node
import chalk from 'chalk';
import * as clear from 'clear';
import * as program from 'commander';
import * as figlet from 'figlet';
import { ProjectCommand } from './commands/project';

export class CLI {
  // program: program.CommanderStatic;
  private commands: any[];

  constructor() {
    this.commands = [new ProjectCommand()];
  }

  public start(): void {
    clear();

    console.log(
      chalk.yellow(
        figlet.textSync('SCAFFOLDME-CLI', {
          font: 'Epic',
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })
      )
    );

    this.commands.forEach(command => {
      command.commands();
    });

    program.version('1.0.0').description('SCAFFOLDME CLI');
    program.parse(process.argv);
  }
}

const cli = new CLI();
cli.start();
