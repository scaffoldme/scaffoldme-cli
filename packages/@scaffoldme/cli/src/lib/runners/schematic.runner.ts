import { existsSync } from "fs";
import { join, resolve } from "path";
import { AbstractRunner } from "./abstract.runner";

export class SchematicRunner extends AbstractRunner {
  constructor() {
    console.log("schematic runner", SchematicRunner);

    super(`"${SchematicRunner.findClosestSchematicsBinary()}"`);
  }

  public static getModulePaths() {
    return module.paths;
  }

  /**
   * Find Schematic Binary in CLI folder
   */
  public static findClosestSchematicsBinary(): string {
    console.log("............findClosestSchematicsBinary");

    const subPath = join(".bin", "schematics");
    console.log("subPath", subPath);

    for (const path of this.getModulePaths()) {
      console.log("PATH....", path);

      const binaryPath = resolve(path, subPath);
      if (existsSync(binaryPath)) {
        return binaryPath;
      }
    }

    throw new Error("'schematics' binary path could not be found!");
  }
}
