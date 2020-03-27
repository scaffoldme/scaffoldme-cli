import {
  BaseEnvironment,
  EnvironmentInfosWithRelations,
  Input
} from "@scaffoldme/core";
import chalk from "chalk";
import { backEnd } from "./environments/backEnd";
import { frontEnd } from "./environments/frontEnd";

export class Environment implements BaseEnvironment {
  async install(
    environment: EnvironmentInfosWithRelations,
    inputs: Input[],
    options: Input[]
  ) {
    switch (environment.environmentType) {
      case "frontend":
        await frontEnd.install(environment);
        break;
      case "api":
        await backEnd.install(environment, inputs, options);
        break;

      default:
        console.log(
          chalk.red(`${environment.environmentType} is not supported right now`)
        );
        process.exit();
    }
  }
}
