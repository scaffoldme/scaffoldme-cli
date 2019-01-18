#!/usr/bin/env node

import * as chalk from 'chalk';
import * as dataJson from '../data/generate.json';
import { ParserData } from './parserData';

import { FileHelper } from './fileHelper';
var shell = require('shelljs');

const dirnames = {
    haakily: "HAAKILY"
  };

  export class ProcessData {
    constructor(
        public fileHelper: FileHelper = new FileHelper(),
        public parseData: ParserData = new ParserData()
         ) {

    }
  
    async init(): Promise<void> {

        //const data = await this.parseData.getFontEndOptions(dataJson);
        
        const isDir = await FileHelper.createDirectory(dirnames.haakily);        
        if (isDir) {
            console.log(chalk.default.green(`${dirnames.haakily} folder created !!`));
        }

        shell.cd(dirnames.haakily);
        if (shell.exec('ng new front-end --routing=false --style=scss').code == 0) {
            console.log(chalk.default.green("Installation angular Done !! "));
        }
        /* if (shell.exec('git clone https://github.com/klarkc/polymer-loopback-starter-kit.git').code == 0) {
            console.log(chalk.default.green("Git clone Loopback Done !! "));
        } */
        
    }


    add(data: any) : void {
        console.log(chalk.default.green("add"));
        console.log(data);
        
    }

    update() : void {
        console.log(chalk.default.green("update"));
    }

    start() : void {
        console.log(chalk.default.green("start"));
    }

    restart() : void {
        console.log(chalk.default.green("restart"));
    }
  }