import { EnvironmentInfosWithRelations } from "../api/generate/projects-api/models";
import { Input } from "./input";

export interface BaseEnvironment {
  /**
   * Install Environment
   * @param environment
   * @param inputs
   * @param options
   */
  install(
    environment: EnvironmentInfosWithRelations,
    inputs?: Input[],
    options?: Input[]
  ): Promise<void>;
}
