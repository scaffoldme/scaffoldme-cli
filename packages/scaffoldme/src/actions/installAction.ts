import { AbstractAction, Input } from '@scaffoldme/core';
// import { displayNScaffoldmeInformation } from './infoAction'
import { MESSAGES, PROJECT_FILE } from '@scaffoldme/utils'
import chalk from 'chalk';
const fs = require("fs");
import { Project } from '@scaffoldme/core'

export class InstallAction extends AbstractAction {

  /**
   * @param  {Input[]} inputs
   * @param  {Input[]} options
   */
  public async handle(inputs: Input[], options: Input[]) {
    //console.log('input ----', inputs);
    //console.log('options -----', options);

    // await displayNScaffoldmeInformation();
     await checkScaffoldmeJsonFile();
     console.error(
      chalk.green("begin installation ....")
    );
      const project : Project = {name: "amazon", description: "descriptio"}

      if (project.logo == "flavien")
      
     
     

    process.exit(0);
  }
}

/**
 * Check if scaffoldme file exist
 */
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