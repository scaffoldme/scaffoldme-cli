#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');
const program = require('commander');
import * as dataJson from './data/generate.json';
const os = require('os');


import { ProcessCommand } from './src/processCommand';

const run = async () => {
  try {
    const processCommand = new ProcessCommand();
    processCommand.run();

  } catch (err) {
    console.log(err);
  }
};

run();
