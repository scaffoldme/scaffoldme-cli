import { BaseEnvironment, EnvironmentInfosWithRelations, Input } from "@scaffoldme/core";
export declare class Environment implements BaseEnvironment {
    install(environment: EnvironmentInfosWithRelations, inputs: Input[], options: Input[]): Promise<void>;
}
