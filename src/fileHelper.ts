var fs = require('fs');
const os = require('os');
import * as chalk from 'chalk';

export class FileHelper {

  public createDirectory(dirname: string): any {
    try {
        fs.mkdir(dirname, (err: any) => {
            if (err)
            {
                console.log(chalk.default.red(err.message));
            }else {
                console.log(chalk.default.green(`Folder ${dirname} created !! `));
            }
        }); 
    } catch (error) {
        console.log(chalk.default.red(error));
    }
  }
}