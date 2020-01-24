"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_framework_1 = require("@ionic/cli-framework");
const guards_1 = require("../guards");
const color_1 = require("./color");
const logger_1 = require("./utils/logger");
class Command extends cli_framework_1.BaseCommand {
    constructor(namespace) {
        super(namespace);
        this.namespace = namespace;
        this.taskChains = [];
    }
    get deps() {
        return this.namespace.root.env;
    }
    get project() {
        return this.namespace.root.project;
    }
    async execute(inputs, options, runinfo) {
        if (guards_1.isCommandPreRun(this)) {
            await this.preRun(inputs, options, runinfo);
        }
        try {
            await this.validate(inputs);
        }
        catch (e) {
            if (!this.deps.flags.interactive) {
                this.deps.log.warn(`Command ran non-interactively due to ${color_1.input('--no-interactive')} flag, CI being detected, non-TTY, or a config setting.`);
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
    createTaskChain() {
        let output;
        const formatter = logger_1.createFormatter();
        if (this.deps.flags.interactive) {
            output = new cli_framework_1.LogUpdateOutputStrategy();
            this.deps.log.handlers = new Set([new cli_framework_1.StreamHandler({ stream: output.stream, formatter })]);
        }
        else {
            this.deps.log.handlers = logger_1.createDefaultLoggerHandlers();
            output = new cli_framework_1.StreamOutputStrategy({ stream: this.deps.log.createWriteStream(cli_framework_1.LOGGER_LEVELS.INFO, false) });
        }
        const chain = output.createTaskChain();
        this.taskChains.push(chain);
        chain.on('end', () => {
            this.deps.log.handlers = logger_1.createDefaultLoggerHandlers();
        });
        return chain;
    }
}
exports.Command = Command;
