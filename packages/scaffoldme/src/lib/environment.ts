import {
  BaseEnvironment,
  EnvironmentInfosWithRelations
} from "@scaffoldme/core";
import chalk from "chalk";
import { frontEnd } from "./environments/frontEnd";

export class Environment implements BaseEnvironment {
  async install(environment: EnvironmentInfosWithRelations) {
    switch (environment.environmentType) {
      case "frontend":
        await frontEnd.install(environment);
        break;
      case "api":
        console.log("api");
        break;

      default:
        console.log(
          chalk.red(`${environment.environmentType} is not supported right now`)
        );
        process.exit();
    }
  }
}
