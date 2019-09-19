import { BaseCommand, LOGGER_LEVELS, LogUpdateOutputStrategy, OutputStrategy, StreamHandler, StreamOutputStrategy, TaskChain } from '@ionic/cli-framework';
import { CommandInstanceInfo, CommandLineInputs, CommandLineOptions, CommandMetadata, CommandMetadataInput, CommandMetadataOption, ICommand, INamespace, IProject, ScaffoldmeEnvironment } from '../definitions';
import { isCommandPreRun } from '../guards';
import { input } from './color';
import { createDefaultLoggerHandlers, createFormatter } from './utils/logger';

export abstract class Command extends BaseCommand<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption> implements ICommand {
  protected readonly taskChains: TaskChain[] = [];

  constructor(public namespace: INamespace) {
    super(namespace);
  }

  get deps(): ScaffoldmeEnvironment {
    return this.namespace.root.env;
  }

  get project(): IProject {
    return this.namespace.root.project;
  }

  async execute(inputs: CommandLineInputs, options: CommandLineOptions, runinfo: CommandInstanceInfo): Promise<void> {
    if (isCommandPreRun(this)) {
      await this.preRun(inputs, options, runinfo);
    }

    try {
      await this.validate(inputs);
    } catch (e) {
      if (!this.deps.flags.interactive) {
        this.deps.log.warn(`Command ran non-interactively due to ${input('--no-interactive')} flag, CI being detected, non-TTY, or a config setting.`);
      }

      throw e;
    }

    await this.run(inputs, options, runinfo);

    //     const telemetryPromise = (async () => {
    //       if (this.env.config.get('telemetry') !== false && !TERMINAL_INFO.ci) {
    //         const { Telemetry } = await import('./telemetry');

    //         let cmdInputs: CommandLineInputs = [];
    //         const metadata = await this.getMetadata();

    //         if (metadata.name === 'login' || metadata.name === 'logout') {
    //           // This is a hack to wait until the selected commands complete before
    //           // sending telemetry data. These commands update `this.env` in some
    //           // way, which is used in the `Telemetry` instance.
    //           await runPromise;
    //         } else if (metadata.name === 'completion') {
    //           // Ignore telemetry for these commands.
    //           return;
    //         } else if (metadata.name === 'help') {
    //           cmdInputs = inputs;
    //         } else {
    //           cmdInputs = await this.getCleanInputsForTelemetry(inputs, options);
    //         }

    //         const cmd: ICommand = this;
    //         const path = await generateCommandPath(cmd);
    //         const telemetry = new Telemetry({ client: this.env.client, config: this.env.config, getInfo: this.env.getInfo, ctx: this.env.ctx, project: this.project, session: this.env.session });

    //         await telemetry.sendCommand(path.map(([p]) => p).join(' '), cmdInputs);
    //   }
    // }) ();

    // await Promise.all([runPromise, telemetryPromise]);
  }

  createTaskChain(): TaskChain {
    let output: OutputStrategy;

    const formatter = createFormatter();

    if (this.deps.flags.interactive) {
      output = new LogUpdateOutputStrategy();
      this.deps.log.handlers = new Set([new StreamHandler({ stream: output.stream, formatter })]);
    } else {
      this.deps.log.handlers = createDefaultLoggerHandlers();
      output = new StreamOutputStrategy({ stream: this.deps.log.createWriteStream(LOGGER_LEVELS.INFO, false) });
    }

    const chain = output.createTaskChain();
    this.taskChains.push(chain);

    chain.on('end', () => {
      this.deps.log.handlers = createDefaultLoggerHandlers();
    });

    return chain;
  }

}
