import { existsSync } from 'fs';
import { join, resolve } from 'path';

export class SchematicRunner {
  constructor() {
    // console.log("schematic runner", SchematicRunner);
    // super(`"${SchematicRunner.findClosestSchematicsBinary()}"`);
  }

  public getModulePaths() {
    return module.paths;
  }

  /**
   * Find Schematic Binary in CLI folder
   */
  public findClosestSchematicsBinary(): string {
    const subPath = join('.bin', 'schematics');
    for (const path of this.getModulePaths()) {

      const binaryPath = resolve(path, subPath);
      if (existsSync(binaryPath)) {
        return binaryPath;
      }
    }
    throw new Error('\'schematics\' binary path could not be found!');
  }
}
