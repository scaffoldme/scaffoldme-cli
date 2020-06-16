import {EnvironmentInfosWithRelations, IFrontEnd} from '@scaffoldme/core';
import {MESSAGES, PROJECT_FILE} from '@scaffoldme/utils';
import chalk from 'chalk';
import * as fs from 'fs';
import {Angular} from '../generator/angular';
import {ReactGenerator} from '../generator/react';
import {Logger} from '../utils/logger';

const shell = require('shelljs');

export class FrontEnd {
  logger = new Logger('FrontEnd');

  constructor(public angular: Angular = new Angular(), private react: ReactGenerator = new ReactGenerator()) {
  }

  async install(environment: EnvironmentInfosWithRelations) {
    // if (
    //   shell.exec(`git clone ${environment.depot} ${environment.name}`) !== 0
    // ) {
    shell.cd(environment.name);
    if (!fs.existsSync(PROJECT_FILE)) {
      console.error(chalk.red(MESSAGES.SCAFFOLDME_JSON_FILE_NOT_EXIST));
      //  process.exit(0);
    }

    const jsonScaffoldmeFrontEnd: IFrontEnd = JSON.parse(
      fs.readFileSync(PROJECT_FILE, 'utf8')
    );
    // console.log(jsonScaffoldmeFrontEnd.framework.technologyName);
    switch (jsonScaffoldmeFrontEnd.framework.technologyName) {
      case 'Angular':
        // await this.installAngularFramework(jsonScaffoldmeFrontEnd);
        const angular = this.angular.getListTask(jsonScaffoldmeFrontEnd);
        await angular.run();
        await this.logger.signatureTeams('http://localhost:4200', 'angular_app', 'angular-app:v1');
        shell.cd('..');
        break;
      case 'React':
        // await this.installReactFramework();
        const react = this.react.getListTask(jsonScaffoldmeFrontEnd);
        await react.run();
        await this.logger.signatureTeams('http://localhost:3000', 'react_app', 'react-app:v1');
        shell.cd('..');
        break;

      default:
        console.log(
          chalk.red(
            `${jsonScaffoldmeFrontEnd.framework.technologyName} is not supported right now`
          )
        );
        process.exit();
    }
    // }
  }

  /* private static async installAngularFramework(front: IFrontEnd) {
    if (front.framework.versionId ?? front.framework.versionId === "8.0.0") {
      console.log(
        chalk.yellowBright(
          `Installation du Framework ${front.framework.technologyName} `
        )
      );

      let runner = new SchematicRunner();
      await shell.exec(
        `${runner.findClosestSchematicsBinary()} @scaffoldme/schematics-angular:application`
      );

      // shell.mkdir("-p", `${front.framework.technologyName}`);
    } else {
      console.log(
        chalk.red(`Version ${front.framework.versionId} is not supported`)
      );
    }
  }
  private static async installReactFramework() {
    console.log("install react");
  } */

}
