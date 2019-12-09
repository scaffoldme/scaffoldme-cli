import { AbstractAction } from './abstractAction';
import { Input } from '@scaffoldme-cli/scaffoldme';
import { displayNScaffoldmeInformation } from './infoAction'
import { MESSAGES } from '@scaffoldme-cli/scaffoldme-utils/lib/ui/messages'
import { PROJECT_FILE } from '@scaffoldme-cli/scaffoldme-utils/constants'
import chalk from 'chalk';
const fs = require("fs");

export class InstallAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    console.log('input ----', inputs);
    console.log('options -----', options);

    await displayNScaffoldmeInformation();
    await checkScaffoldmeJsonFile();


    process.exit(0);
  }
}

const checkScaffoldmeJsonFile = async () => {
  try {
    if (!fs.existsSync(PROJECT_FILE)) {
      console.error(
        chalk.red(MESSAGES.SCAFFOLDME_JSON_FILE_NOT_EXIST)
      );
    }
  } catch (err) {
    console.error(
      chalk.red("ERROR")
    );
  }
  
};