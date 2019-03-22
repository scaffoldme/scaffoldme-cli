#!/usr/bin/env node

import * as chalk from "chalk";
import { ParserData } from "./parserData";

import { Helper } from "./helper";
var shell = require("shelljs");
import { Angular } from './generator/angular';
import { Loopback } from './generator/loopback';
import { dirnames, Technologies } from "./config";
const fs = require('fs')

const path = './scafoldme.json'

export class ProcessData {
  constructor(
    public fileHelper: Helper = new Helper(),
    public parseData: ParserData = new ParserData(),
    public angular: Angular = new Angular(),
    public loopback: Loopback = new Loopback()
  ) {}

  async init(): Promise<void> {
    fs.access(path, fs.F_OK, (err:any) => {
      if (err) {
        console.log(chalk.default.red("Le fichier scafoldme.json est introuvable"));
        // console.error(err)
        return
      }

      //file exists
    })
     /* const isDir = await Helper.createDirectory(dirnames.BASE_DIR);
        if (isDir) {
            console.log(chalk.default.green(`${dirnames.BASE_DIR} folder created !!`));
        }
        shell.cd(dirnames.BASE_DIR);
        console.log(chalk.default.yellow(`Installation ${ Technologies.FRONT_END} .... !! `));
        await this.angular.generator(Technologies.FRONT_END, "scss", false);

        console.log(chalk.default.yellow(`Installation ${ Technologies.BACK_END} .... !! `));
        await this.loopback.generator();

        console.log(chalk.default.green('Process init end')); */
  }

  add(data: any): void {
    console.log(chalk.default.green("add"));
    console.log(data);
  }

  update(): void {
    console.log(chalk.default.green("update"));
  }

  start(): void {
    console.log(chalk.default.green("start"));
  }

  restart(): void {
    console.log(chalk.default.green("restart"));
  }
}
