import { Framework } from '..';
import { ProjectDeps } from '../..';
import { IVersion, TechnologyName } from '../../../../definitions';
export declare class AngularFramework extends Framework {
    readonly name: TechnologyName;
    readonly port: number;
    constructor(deps: ProjectDeps, selectedVersion: IVersion, port: number);
    install(environmentName: string): Promise<void>;
}
