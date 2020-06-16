import { EnvironmentInfosWithRelations } from "@scaffoldme/core";
export declare class Project {
    private data;
    constructor();
    load(): void;
    getProjectName(): string;
    getEnvironments(): EnvironmentInfosWithRelations[];
}
