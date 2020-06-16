import { EnvironmentInfosWithRelations } from "@scaffoldme/core";
import { Angular } from "../generator/angular";
export declare class frontEnd {
    angular: Angular;
    constructor(angular?: Angular);
    install(environment: EnvironmentInfosWithRelations): Promise<void>;
}
