import { BaseEnvironment, EnvironmentInfosWithRelations } from "@scaffoldme/core";
import { backEnd } from "./environments/backEnd";
import { frontEnd } from "./environments/frontEnd";
export declare class Environment implements BaseEnvironment {
    backend: backEnd;
    frontend: frontEnd;
    constructor(backend?: backEnd, frontend?: frontEnd);
    install(environment: EnvironmentInfosWithRelations): Promise<void>;
}
