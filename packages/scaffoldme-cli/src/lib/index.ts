import { createPromptModule, LOGGER_LEVELS } from '@ionic/cli-framework';
import { TERMINAL_INFO } from '@ionic/utils-terminal';
import * as Debug from 'debug';
import * as path from 'path';
import { ERROR_VERSION_TOO_OLD } from '../bootstrap';
import { InfoItem, IProject, ScaffoldmeContext, ScaffoldmeEnvironment, ScaffoldmeEnvironmentFlags } from '../definitions';
import { input } from './color';
import { Config, CONFIG_FILE, DEFAULT_CONFIG_DIRECTORY, parseGlobalOptions } from './config';
import { EnvironmentCLI } from './environmentCLI';
import { Client } from './http';
import { loadProjectFromProjectFile } from './project';
import { createOnFallback } from './prompts';
import { ProSession } from './session';
import { prependNodeModulesBinToPath, Shell } from './shell';
import { PROXY_ENVIRONMENT_VARIABLES } from './utils/http';
import { createDefaultLoggerHandlers, Logger } from './utils/logger';

const debug = Debug('scaffoldme:lib');

export async function generateScaffoldmeEnvironment(ctx: ScaffoldmeContext, pargv: string[]): Promise<{ env: ScaffoldmeEnvironment; project: IProject; }> {
  process.chdir(ctx.execPath);

  const argv = parseGlobalOptions(pargv);
  const config = new Config(path.resolve(process.env.IONIC_CONFIG_DIRECTORY || DEFAULT_CONFIG_DIRECTORY, CONFIG_FILE));

  debug('Terminal info: %o', TERMINAL_INFO);

  const flags = argv as any as ScaffoldmeEnvironmentFlags; // TODO
  debug('CLI global options: %o', flags);

  const log = new Logger({
    level: argv.quiet ? LOGGER_LEVELS.WARN : LOGGER_LEVELS.INFO,
    handlers: createDefaultLoggerHandlers(),
  });

  const prompt = await createPromptModule({
    interactive: argv.interactive,
    onFallback: createOnFallback({ flags, log }),
  });

  const projectDir = ctx.execPath;
  const proxyVars = PROXY_ENVIRONMENT_VARIABLES.map((e): [string, string | undefined] => [e, process.env[e]]).filter(([, v]) => !!v);

  const getInfo = async () => {
    const osName = await import('os-name');
    const os = osName();

    const npm = await shell.cmdinfo('npm', ['-v']);

    const info: InfoItem[] = [
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

    info.push(...proxyVars.map(([e, v]): InfoItem => ({ group: 'environment', key: e, value: v || 'not set' })));

    if (project) {
      info.push(...(await project.getInfo()));
    }

    return info;
  };

  const shell = new Shell({ log }, { alterPath: (p) => projectDir ? prependNodeModulesBinToPath(projectDir, p) : p });
  const client = new Client(config);
  const session = new ProSession({ config, client });
  const deps = { client, config, ctx, flags, log, prompt, session, shell };
  const env = new EnvironmentCLI({ getInfo, ...deps });

  if (process.env.IONIC_CLI_LOCAL_ERROR) {
    if (process.env.IONIC_CLI_LOCAL_ERROR === ERROR_VERSION_TOO_OLD) {
      log.warn(`Detected locally installed Scaffoldme CLI, but it's too old--using global CLI.`);
    }
  }

  if (typeof argv.yarn === 'boolean') {
    log.warn(`${input('--yarn')} / ${input('--no-yarn')} has been removed. Use ${input(`scaffoldme config set -g npmClient ${argv.yarn ? 'yarn' : 'npm'}`)}.`);
  }

  const project = await loadProjectFromProjectFile(projectDir, argv, deps);

  // if (project) {
  //   shell.alterPath = (p) => prependNodeModulesBinToPath(project.directory, p);
  // }

  return { env, project };
}
