"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* import chalk from "chalk";
import { readFile } from "fs";
// import { platform, release } from 'os';
// import osName = require('os-name');
import { join } from "path"; */
const abstractAction_1 = require("./abstractAction");
// import { InfoA } from '@scaffoldme-cli/scaffoldme-core'
class InfoAction extends abstractAction_1.AbstractAction {
    async handle() {
        // await displayNestInformation();
    }
}
exports.InfoAction = InfoAction;
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
