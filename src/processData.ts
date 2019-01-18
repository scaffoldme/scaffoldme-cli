#!/usr/bin/env node

import * as chalk from 'chalk';
import * as dataJson from '../data/generate.json';

import { FileHelper } from './fileHelper';

const dirnames = {
    haakily: "HAAKILY"
  };

  export class ProcessData {
    constructor(public fileHelper: FileHelper = new FileHelper()) {

    }
  
    init(): void {

        console.log(chalk.default.green("init"));
        this.fileHelper.createDirectory(dirnames.haakily);
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