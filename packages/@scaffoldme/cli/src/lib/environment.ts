import {
  BaseEnvironment,
  EnvironmentInfosWithRelations,
  Input,
} from "@scaffoldme/core";
import chalk from "chalk";
import { backEnd } from "./environments/backEnd";
import { frontEnd } from "./environments/frontEnd";

export class Environment implements BaseEnvironment {
  constructor(
    public backend: backEnd = new backEnd(),
    public frontend: frontEnd = new frontEnd()
  ) {}
  async install(
    environment: EnvironmentInfosWithRelations,
    inputs: Input[],
    options: Input[]
  ) {
    switch (environment.environmentType) {
      case "frontend":
        await this.frontend.install(environment);
        break;
      case "api":
        await this.backend.install(environment, inputs, options);
        break;

      default:
        console.log(
          chalk.red(`${environment.environmentType} is not supported right now`)
        );
        process.exit();
    }
  }
}
