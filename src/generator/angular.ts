#!/usr/bin/env node
'use strict';

var shell = require("shelljs");
import * as chalk from "chalk";
const jsonfile = require("jsonfile");

import { dirnames } from "../config";
import {packageJSON } from "../interface/packagejson";

export class Angular {

  async  generator(name:string, style:string, routing:boolean) {

		 if (shell.exec(`ng new ${name} --routing=${routing} --style=${style}`).code == 0) {
      console.log(chalk.default.green(`Installation ${name} Done !! `));

      shell.cd(`${name}`);

      /* add command to create all model and service in angular project */
      console.log(chalk.default.yellow(`Updating package.json `));
      const packageJSON: packageJSON = await jsonfile.readFile(`./${dirnames.FILE}`);
      packageJSON.scripts.haakily =
      "openapi-generator generate -i ./haakily.json -g typescript-angular -o generated-sources/openapi --additional-properties='ngVersion=6.1.7'";
      await jsonfile.writeFile(`./${dirnames.FILE}`, packageJSON);
      console.log(chalk.default.green(`package.json Updated`));
      shell.cd('..');

    }
  }
}
