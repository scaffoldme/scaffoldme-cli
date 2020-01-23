/* import chalk from "chalk";
import { readFile } from "fs";
// import { platform, release } from 'os';
// import osName = require('os-name');
import { join } from "path"; */
import { AbstractAction } from "./abstractAction";
// import { InfoA } from '@scaffoldme-cli/scaffoldme-core'

export class InfoAction extends AbstractAction {
  public async handle() {
    // await displayNestInformation();
  }
}
/* 
interface PackageJsonDependencies {
  [key: string]: string;
}

export const displayNScaffoldmeInformation = async () => {
  console.info(chalk.green("[sc Information]"));
  try {
    const dependencies: PackageJsonDependencies = await readProjectPackageJsonDependencies();
    // displayNestVersions(dependencies);
    console.log(dependencies);
  } catch {
    console.error(chalk.red("fail"));
  }
};

const readProjectPackageJsonDependencies = async (): Promise<PackageJsonDependencies> => {
  return new Promise<PackageJsonDependencies>((resolve, reject) => {
    readFile(
      join(process.cwd(), "package.json"),
      (error: NodeJS.ErrnoException | null, buffer: Buffer) => {
        if (error !== undefined && error !== null) {
          reject(error);
        } else {
          resolve(JSON.parse(buffer.toString()).dependencies);
        }
      }
    );
  });
}; */
