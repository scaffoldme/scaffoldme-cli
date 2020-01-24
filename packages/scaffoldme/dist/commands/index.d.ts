import { IProject, ScaffoldmeEnvironment } from '../definitions';
import { CommandMap, Namespace, NamespaceMap } from '../lib/namespace';
export interface IonicEnvironmentDeps {
    readonly env: ScaffoldmeEnvironment;
    readonly project: IProject;
}
export declare class IonicNamespace extends Namespace {
    protected _env: ScaffoldmeEnvironment;
    protected _project: IProject;
    constructor({ env, project }: IonicEnvironmentDeps);
    get project(): IProject;
    set project(p: IProject);
    get env(): ScaffoldmeEnvironment;
    set env(env: ScaffoldmeEnvironment);
    getMetadata(): Promise<{
        name: string;
        summary: string;
    }>;
    getNamespaces(): Promise<NamespaceMap>;
    getCommands(): Promise<CommandMap>;
}
