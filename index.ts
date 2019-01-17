#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const program = require('commander');

clear();
console.log(
  chalk.yellow(figlet.textSync('HAAKILY-CLI', { horizontalLayout: 'full' }))
);

const run = async () => {
  try {

    program
      .version('0.0.1')
      .description("HAAKILY CLI")
      .option('-i, --init', 'initialization of the project')
      .option('-a, --add', 'Add new .....')
      .option('-u, --update', 'Update')
      .option('-s, --start', 'Start.....')
      .option('-r, --restart', 'Restart......')
      .option('-e, --exit', 'Exit......')
      .parse(process.argv);

      if (!process.argv.slice(2).length) {
        program.outputHelp();
      }

  } catch (err) {
    console.log(err);
  }
};

run();