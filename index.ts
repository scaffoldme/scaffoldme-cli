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

    /* fs.mkdir(dirnames.haakily, (err: any) => {
        if (err)
        {
            console.log(err.message);
        }else {
            console.log(`${dirnames.haakily} created !! `);
        }
    }); */

   /*  const processData = new ProcessData();

    processData.init(dataJson); */

    //console.log(os.homedir());

    //console.log(dataJson.configuration);


  } catch (err) {
    console.log(err);
  }
};



run();