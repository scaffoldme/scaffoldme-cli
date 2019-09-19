import { PromptModule } from '@ionic/cli-framework';
import { IClient, IConfig, ILogger, InfoItem, ISession, IShell, ScaffoldmeContext, ScaffoldmeEnvironment, ScaffoldmeEnvironmentFlags } from '../definitions';


export interface EnvironmentCLIDeps {
  readonly client: IClient;
  readonly config: IConfig; // CLI global config (~/.ionic/config.json)
  readonly flags: ScaffoldmeEnvironmentFlags;
  readonly getInfo: () => Promise<InfoItem[]>;
  readonly log: ILogger;
  readonly ctx: ScaffoldmeContext;
  readonly prompt: PromptModule;
  readonly session: ISession;
  readonly shell: IShell;
}

export class EnvironmentCLI implements ScaffoldmeEnvironment {
  readonly flags: ScaffoldmeEnvironmentFlags;
  readonly client: IClient;
  readonly config: IConfig; // CLI global config (~/.ionic/config.json)
  getInfo: () => Promise<InfoItem[]>;
  readonly log: ILogger;
  readonly prompt: PromptModule;
  session: ISession;
  readonly shell: IShell;
  readonly ctx: ScaffoldmeContext;

  constructor({ client, config, flags, getInfo, log, ctx, prompt, session, shell }: EnvironmentCLIDeps) {
    this.client = client;
    this.config = config;
    this.flags = flags;
    this.getInfo = getInfo;
    this.log = log;
    this.ctx = ctx;
    this.prompt = prompt;
    this.session = session;
    this.shell = shell;
  }
}
