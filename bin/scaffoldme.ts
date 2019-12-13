#!/usr/bin/env node
import * as commander from 'commander';
//import { CommanderStatic } from 'commander';
import { Loader } from '../packages/scaffoldme/src/loader';
import {
  loadLocalBinCommandLoader,
  localBinExists,
} from '../packages/scaffoldme-utils/src/local-binaries';

const bootstrap = () => {
  const program =  commander.CommanderStatic;
  program
    .version(require('../package.json').version)
    .usage('<command> [options]');

  if (localBinExists()) {
    const localCommandLoader = loadLocalBinCommandLoader();
    localCommandLoader.load(program);
  } else {
    Loader.load(program);
  }
  commander.parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
};

bootstrap();
