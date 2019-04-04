import { Environment } from "./Environment";

export interface Framework {
  /**
   * generates a development environment
   * @param environment TypeEnvironment
   */
  generator(environment: Environment): Promise<void>

  /**
   * Ajoutez du style a un environnement
   * @param styleType TypeStyle
   */
  addstyle(styleType: string) : Promise<void>
}
