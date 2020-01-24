/// <reference types="node" />
import { AbstractExecutor } from '@ionic/cli-framework';
import { CommandInstanceInfo, CommandMetadata, CommandMetadataInput, CommandMetadataOption, ICommand, INamespace } from '../definitions';
export interface ExecutorDeps {
    readonly namespace: INamespace;
}
export declare class Executor extends AbstractExecutor<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption> {
    readonly namespace: INamespace;
    constructor({ namespace }: ExecutorDeps);
    execute(argv: string[], env: NodeJS.ProcessEnv): Promise<void>;
    run(command: ICommand, cmdargs: string[], { location, env, executor }: CommandInstanceInfo): Promise<void>;
}
export declare function runCommand(runinfo: CommandInstanceInfo, argv: string[]): Promise<void>;
export declare function metadataToCmdOptsEnv(metadata: CommandMetadata, cmdNameParts: string[]): Map<CommandMetadataOption, string>;
