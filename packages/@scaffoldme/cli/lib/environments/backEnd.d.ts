import { EnvironmentInfosWithRelations } from "@scaffoldme/core";
import { Loopback } from "../generator/loopback";
export declare class backEnd {
    loopback: Loopback;
    constructor(loopback?: Loopback);
    install(environment: EnvironmentInfosWithRelations): Promise<void>;
}
