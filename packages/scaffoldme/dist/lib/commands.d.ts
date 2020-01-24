import { BaseCommand, TaskChain } from '@ionic/cli-framework';
import { CommandInstanceInfo, CommandLineInputs, CommandLineOptions, CommandMetadata, CommandMetadataInput, CommandMetadataOption, ICommand, INamespace, IProject, ScaffoldmeEnvironment } from '../definitions';
export declare abstract class Command extends BaseCommand<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption> implements ICommand {
    namespace: INamespace;
    protected readonly taskChains: TaskChain[];
    constructor(namespace: INamespace);
    get deps(): ScaffoldmeEnvironment;
    get project(): IProject;
    execute(inputs: CommandLineInputs, options: CommandLineOptions, runinfo: CommandInstanceInfo): Promise<void>;
    createTaskChain(): TaskChain;
}
