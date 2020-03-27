import { AbstractRunner } from "./abstract.runner";
export declare class SchematicRunner extends AbstractRunner {
    constructor();
    static getModulePaths(): string[];
    /**
     * Find Schematic Binary in CLI folder
     */
    static findClosestSchematicsBinary(): string;
}
