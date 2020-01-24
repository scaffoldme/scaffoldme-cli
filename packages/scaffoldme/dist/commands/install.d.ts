import { CommandLineInputs, CommandLineOptions } from '@ionic/cli-framework';
import { CommandInstanceInfo, CommandMetadata, CommandPreRun } from '../definitions';
import { Command } from '../lib/commands';
export declare class InstallCommand extends Command implements CommandPreRun {
    getMetadata(): Promise<CommandMetadata>;
    preRun(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    run(inputs: CommandLineInputs, options: CommandLineOptions, runinfo: CommandInstanceInfo): Promise<void>;
}
