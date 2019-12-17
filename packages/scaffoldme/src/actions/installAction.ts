import { AbstractAction, Input } from '@scaffoldme/core';
// import { displayNScaffoldmeInformation } from './infoAction'
import { MESSAGES, PROJECT_FILE } from '@scaffoldme/utils'
import chalk from 'chalk';
const fs = require("fs");

export class InstallAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    //console.log('input ----', inputs);
    //console.log('options -----', options);

    // await displayNScaffoldmeInformation();
     await checkScaffoldmeJsonFile();
     console.log('la suite');
     

    process.exit(0);
  }
}

const checkScaffoldmeJsonFile = async () => {
  
  try {
    if (!fs.existsSync(PROJECT_FILE)) {
      console.error(
        chalk.red(MESSAGES.SCAFFOLDME_JSON_FILE_NOT_EXIST)
      );
      process.exit(0);
    }
  } catch (err) {
    console.error(
      chalk.red("ERROR")
    );
    process.exit(0);
  }
  
};