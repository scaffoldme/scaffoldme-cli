#!/usr/bin/env node
import * as commander from 'commander';
import { CommanderStatic } from 'commander';
import { Loader } from '../packages/scaffoldme';

const bootstrap = () => {
  const program: CommanderStatic = commander;
  program
    .version(require('../package.json').version)
    .usage('<command> [options]');
  Loader.load(program);
  commander.parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
};

bootstrap();
