import { BaseEnvironment, EnvironmentInfosWithRelations } from "@scaffoldme/core";
export declare class Environment implements BaseEnvironment {
    install(environment: EnvironmentInfosWithRelations): Promise<void>;
}
