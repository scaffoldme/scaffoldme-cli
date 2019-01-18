#!/usr/bin/env node

  import * as chalk from 'chalk';
  import * as dataJson from '../data/generate.json';

import { FileHelper } from './fileHelper';

  export class ProcessData {
    constructor(public fileHelper: FileHelper = new FileHelper()) {

    }
  
    init(): void {

        console.log(chalk.default.green("init"));
        /* const exist = this.fileHelper.checkDirectory('~/Documents/Haakily');
        if (!exist)
        {
            console.log(chalk.default.red(exist + ' files not found'));
            const folder = this.fileHelper.createDirectory('~/Documents/Haakily');
            console.log(chalk.default.green(folder));
        }else {
            console.log(chalk.default.green(exist + ' files found'));
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