"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchematicRunner = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class SchematicRunner {
    constructor() {
        // console.log("schematic runner", SchematicRunner);
        // super(`"${SchematicRunner.findClosestSchematicsBinary()}"`);
    }
    getModulePaths() {
        return module.paths;
    }
    /**
     * Find Schematic Binary in CLI folder
     */
    findClosestSchematicsBinary() {
        const subPath = path_1.join(".bin", "schematics");
        for (const path of this.getModulePaths()) {
            const binaryPath = path_1.resolve(path, subPath);
            if (fs_1.existsSync(binaryPath)) {
                return binaryPath;
            }
        }
        throw new Error("'schematics' binary path could not be found!");
    }
}
exports.SchematicRunner = SchematicRunner;
