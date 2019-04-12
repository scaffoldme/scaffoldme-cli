#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');
import { ProcessData } from './processData';

const program = require('commander');
const { prompt } = require('inquirer');

export class ProcessCommand {
  constructor(public processData: ProcessData = new ProcessData()) {

  }

  run(): void {

    // Technologies Questions
    const questions = [
        { type: 'list', name: 'name', message: 'Techno name', choices: [ "techno A", "techno B" ] },
        { type: 'input', name: 'version', message: 'enter version of techno'},
        { type: 'confirm', name: 'prefer1', message: 'Do you prefer your 1?', default: false },
        { type: 'confirm', name: 'prefer2', message: 'Do you prefer your 2?', default: false },
    ];

    program
    .version('1.0.0')
    .description('SCAFFOLDME CLI')


    // Init Command
    program
    .command('init')
    .alias('i')
    .description("Initialisation des environnements & deploiement des machines docker ")
    .parse(process.argv)
    .action(() => this.processData.init());

    // Add Command
    /* program
    .command('add')
    .alias('a')
    .description('add new')
    //.action(() => this.processData.add());
    .action(() => {
        prompt(questions)
        .then( (answers: any) => {
            this.processData.add(answers)
        })
      }); */

    // start Command
    /* program
    .command('start <container_name>')
    .alias('s')
    .description("lancer un container") */
    // .action(() => this.processData.start(container_name, args));


    program
    .command('start <container_name>')
    .alias('str')
    //.option('-f, --force', 'Remove recursively')
    .description("lancer un container")
    .action((container_name: string) => this.processData.start(container_name));

    program
    .command('stop <container_name>')
    .alias('stp')
    //.option('-f, --force', 'Remove recursively')
    .description("arreter un container")
    .action((container_name: string) => this.processData.stop(container_name));

    /* .action(function (container_name:any) {
      console.log('remove ' + container_name)
    }) */


    //start all command
    program.parse(process.argv);

    if (!process.argv.slice(2).length) {
        clear();
        console.log(
        chalk.yellow(
            figlet.textSync("SCAFFOLDME-CLI", {
            font: "Epic",
            horizontalLayout: "default",
            verticalLayout: "default"
            })
        )
        );
        program.outputHelp();
      }
  }
}
