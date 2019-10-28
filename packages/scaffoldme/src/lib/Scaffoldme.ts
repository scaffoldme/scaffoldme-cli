const program = require('commander');
const clear = require('clear');

export class Scaffoldme {
  constructor() {

  }

  run(): void {
    program
    .version('1.0.0')
    .description('HAAKILY CLI')


    // Init Command
    program
    .command('init')
    .alias('i')
    .description('Init ')
    .parse(process.argv)
    .action(() => {
      console.log('init')
    });

    // Add Command
    program
    .command('add')
    .alias('a')
    .description('add new')


    //start all command
    program.parse(process.argv);

    if (!process.argv.slice(2).length) {
      clear();
      program.outputHelp();
    }

  }
}
