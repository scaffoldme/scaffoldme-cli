import { readFile } from 'fs';
import chalk from 'chalk';
// import { platform, release } from 'os';
// import osName = require('os-name');
import { join } from 'path';
import { AbstractAction } from './abstractAction';
import { MESSAGES } from '@scaffoldme-cli/scaffoldme-utils/lib/ui/messages'
// import { InfoA } from '@scaffoldme-cli/scaffoldme-core'

export class InfoAction extends AbstractAction {
    public async handle() {
      // await displayNestInformation();
    }
}

interface PackageJsonDependencies {
    [key: string]: string;
}


export const displayNScaffoldmeInformation = async () => {
    console.info(chalk.green('[Nest Information]'));
    try {
      const dependencies: PackageJsonDependencies = await readProjectPackageJsonDependencies();
      // displayNestVersions(dependencies);
      console.log(dependencies);
      
    } catch {
      console.error(chalk.red(MESSAGES.NEST_INFORMATION_PACKAGE_MANAGER_FAILED));
    }
  };

const readProjectPackageJsonDependencies = async (): Promise<PackageJsonDependencies> => {
    return new Promise<PackageJsonDependencies>((resolve, reject) => {
      readFile(
        join(process.cwd(), 'package.json'),
        (error: NodeJS.ErrnoException | null, buffer: Buffer) => {
          if (error !== undefined && error !== null) {
            reject(error);
          } else {
            resolve(JSON.parse(buffer.toString()).dependencies);
          }
        },
      );
    });
  };