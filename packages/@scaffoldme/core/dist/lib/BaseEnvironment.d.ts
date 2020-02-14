import { EnvironmentInfosWithRelations } from "../api/generate/projects-api/models";
export interface BaseEnvironment {
    /**
     * Install Environment
     * @param environment
     */
    install(environment: EnvironmentInfosWithRelations): Promise<void>;
}
