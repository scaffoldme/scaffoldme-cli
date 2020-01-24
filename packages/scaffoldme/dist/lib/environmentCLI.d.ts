import { PromptModule } from '@ionic/cli-framework';
import { IClient, IConfig, ILogger, InfoItem, ISession, IShell, ScaffoldmeContext, ScaffoldmeEnvironment, ScaffoldmeEnvironmentFlags } from '../definitions';
export interface EnvironmentCLIDeps {
    readonly client: IClient;
    readonly config: IConfig;
    readonly flags: ScaffoldmeEnvironmentFlags;
    readonly getInfo: () => Promise<InfoItem[]>;
    readonly log: ILogger;
    readonly ctx: ScaffoldmeContext;
    readonly prompt: PromptModule;
    readonly session: ISession;
    readonly shell: IShell;
}
export declare class EnvironmentCLI implements ScaffoldmeEnvironment {
    readonly flags: ScaffoldmeEnvironmentFlags;
    readonly client: IClient;
    readonly config: IConfig;
    getInfo: () => Promise<InfoItem[]>;
    readonly log: ILogger;
    readonly prompt: PromptModule;
    session: ISession;
    readonly shell: IShell;
    readonly ctx: ScaffoldmeContext;
    constructor({ client, config, flags, getInfo, log, ctx, prompt, session, shell }: EnvironmentCLIDeps);
}
