"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_framework_1 = require("@ionic/cli-framework");
const utils_terminal_1 = require("@ionic/utils-terminal");
const Debug = require("debug");
const path = require("path");
const bootstrap_1 = require("../bootstrap");
const color_1 = require("./color");
const config_1 = require("./config");
const environmentCLI_1 = require("./environmentCLI");
const http_1 = require("./http");
const project_1 = require("./project");
const prompts_1 = require("./prompts");
const session_1 = require("./session");
const shell_1 = require("./shell");
const http_2 = require("./utils/http");
const logger_1 = require("./utils/logger");
const debug = Debug('scaffoldme:lib');
async function generateScaffoldmeEnvironment(ctx, pargv) {
    process.chdir(ctx.execPath);
    const argv = config_1.parseGlobalOptions(pargv);
    const config = new config_1.Config(path.resolve(process.env.IONIC_CONFIG_DIRECTORY || config_1.DEFAULT_CONFIG_DIRECTORY, config_1.CONFIG_FILE));
    debug('Terminal info: %o', utils_terminal_1.TERMINAL_INFO);
    const flags = argv; // TODO
    debug('CLI global options: %o', flags);
    const log = new logger_1.Logger({
        level: argv.quiet ? cli_framework_1.LOGGER_LEVELS.WARN : cli_framework_1.LOGGER_LEVELS.INFO,
        handlers: logger_1.createDefaultLoggerHandlers(),
    });
    const prompt = await cli_framework_1.createPromptModule({
        interactive: argv.interactive,
        onFallback: prompts_1.createOnFallback({ flags, log }),
    });
    const projectDir = ctx.execPath;
    const proxyVars = http_2.PROXY_ENVIRONMENT_VARIABLES.map((e) => [e, process.env[e]]).filter(([, v]) => !!v);
    const getInfo = async () => {
        const osName = await Promise.resolve().then(() => require('os-name'));
        const os = osName();
        const npm = await shell.cmdinfo('npm', ['-v']);
        const info = [
            {
                group: 'scaffoldme',
                key: 'Scaffoldme CLI',
                value: ctx.version,
                path: ctx.libPath,
            },
            { group: 'system', key: 'NodeJS', value: process.version, path: process.execPath },
            { group: 'system', key: 'npm', value: npm || 'not installed' },
            { group: 'system', key: 'OS', value: os }
        ];
        info.push(...proxyVars.map(([e, v]) => ({ group: 'environment', key: e, value: v || 'not set' })));
        if (project) {
            info.push(...(await project.getInfo()));
        }
        return info;
    };
    const shell = new shell_1.Shell({ log }, { alterPath: (p) => projectDir ? shell_1.prependNodeModulesBinToPath(projectDir, p) : p });
    const client = new http_1.Client(config);
    const session = new session_1.ProSession({ config, client });
    const deps = { client, config, ctx, flags, log, prompt, session, shell };
    const env = new environmentCLI_1.EnvironmentCLI({ getInfo, ...deps });
    if (process.env.IONIC_CLI_LOCAL_ERROR) {
        if (process.env.IONIC_CLI_LOCAL_ERROR === bootstrap_1.ERROR_VERSION_TOO_OLD) {
            log.warn(`Detected locally installed Scaffoldme CLI, but it's too old--using global CLI.`);
        }
    }
    if (typeof argv.yarn === 'boolean') {
        log.warn(`${color_1.input('--yarn')} / ${color_1.input('--no-yarn')} has been removed. Use ${color_1.input(`scaffoldme config set -g npmClient ${argv.yarn ? 'yarn' : 'npm'}`)}.`);
    }
    const project = await project_1.loadProjectFromProjectFile(projectDir, argv, deps);
    // if (project) {
    //   shell.alterPath = (p) => prependNodeModulesBinToPath(project.directory, p);
    // }
    return { env, project };
}
exports.generateScaffoldmeEnvironment = generateScaffoldmeEnvironment;
