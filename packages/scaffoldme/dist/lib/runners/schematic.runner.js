"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const abstract_runner_1 = require("./abstract.runner");
class SchematicRunner extends abstract_runner_1.AbstractRunner {
    constructor() {
        console.log("schematic runner", SchematicRunner);
        super(`"${SchematicRunner.findClosestSchematicsBinary()}"`);
    }
    static getModulePaths() {
        return module.paths;
    }
    /**
     * Find Schematic Binary in CLI folder
     */
    static findClosestSchematicsBinary() {
        console.log("............findClosestSchematicsBinary");
        const subPath = path_1.join(".bin", "schematics");
        console.log("subPath", subPath);
        for (const path of this.getModulePaths()) {
            console.log("PATH....", path);
            const binaryPath = path_1.resolve(path, subPath);
            if (fs_1.existsSync(binaryPath)) {
                return binaryPath;
            }
        }
        throw new Error("'schematics' binary path could not be found!");
    }
}
exports.SchematicRunner = SchematicRunner;