import { BaseError, InputValidationError, PackageJson } from '@ionic/cli-framework';
import { readPackageJsonFile } from '@ionic/cli-framework/utils/node';
import { processExit } from '@ionic/utils-process';
import * as Debug from 'debug';
import * as path from 'path';
import { IonicNamespace as ScaffoldmeNamespace } from './commands';
import { ScaffoldmeContext } from './definitions';
import { isExitCodeException, isSuperAgentError } from './guards';
import { generateScaffoldmeEnvironment } from './lib';
import { failure, input, strong } from './lib/color';
import { Executor } from './lib/executor';

export * from './constants';
export * from './definitions';
export * from './guards';

const debug = Debug('scaffoldme');

const PACKAGE_ROOT_PATH = path.resolve(__dirname, '..');
const PACKAGE_JSON_PATH = path.resolve(PACKAGE_ROOT_PATH, 'package.json');

let _pkg: PackageJson | undefined;
let _executor: Executor | undefined;

async function loadPackageJson(): Promise<PackageJson> {
  if (!_pkg) {
    _pkg = await readPackageJsonFile(PACKAGE_JSON_PATH);
  }

  return _pkg;
}

export async function generateContext(): Promise<ScaffoldmeContext> {
  const pkg = await loadPackageJson();

  if (!pkg.bin || !pkg.bin.scaffoldme) {
    throw new Error(`Missing "${strong('bin.scaffoldme')}" in Scaffoldme CLI package.json`);
  }

  if (!pkg.main) {
    throw new Error(`Missing "${strong('main')}" in in Scaffoldme CLI package.json`);
  }

  return {
    binPath: path.resolve(PACKAGE_ROOT_PATH, pkg.bin.scaffoldme),
    libPath: PACKAGE_ROOT_PATH,
    execPath: process.cwd(),
    version: pkg.version,
  };
}

export async function loadExecutor(ctx: ScaffoldmeContext, pargv: string[]): Promise<Executor> {
  if (!_executor) {
    const deps = await generateScaffoldmeEnvironment(ctx, pargv);
    const namespace = new ScaffoldmeNamespace(deps);
    _executor = new Executor({ namespace });
  }

  return _executor;
}

export async function run(pargv: string[]): Promise<void> {
  let err: any;
  let executor: Executor;

  try {
    executor = await loadExecutor(await generateContext(), pargv);
  } catch (e) {
    process.stderr.write(`${e.message ? e.message : (e.stack ? e.stack : e)}\n`);
    process.exitCode = 1;
    return;
  }

  const ienv = executor.namespace.env;

  if (pargv[0] !== '_') {
    try {
      debug('Context: %o', ienv.ctx);

      ienv.config.set('version', ienv.ctx.version);

      await executor.execute(pargv, process.env);

      // if (ienv.flags.interactive) {
      //   const updateNotifier = await import('update-notifier');
      //   updateNotifier({ pkg: await loadPackageJson() }).notify({ isGlobal: true });
      // }
    } catch (e) {
      err = e;
    }
  }

  if (err) {
    process.exitCode = 1;

    if (err instanceof InputValidationError) {
      for (const e of err.errors) {
        ienv.log.error(e.message);
      }
      ienv.log.msg(`Use the ${input('--help')} flag for more details.`);
    } else if (isSuperAgentError(err)) {
      const { formatSuperAgentError } = await import('./lib/http');
      ienv.log.rawmsg(formatSuperAgentError(err));
    } else if (err.code && err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
      ienv.log.error(
        `Network connectivity error occurred, are you offline?\n` +
        `If you are behind a firewall and need to configure proxy settings, see: ${strong('https://ion.link/cli-proxy-docs')}\n\n` +
        failure(String(err.stack ? err.stack : err))
      );
    } else if (isExitCodeException(err)) {
      if (err.message) {
        if (err.exitCode > 0) {
          ienv.log.error(err.message);
        } else {
          ienv.log.msg(err.message);
        }
      }

      await processExit(err.exitCode);
    } else if (err instanceof BaseError) {
      ienv.log.error(err.message);
    } else {
      ienv.log.msg(failure(String(err.stack ? err.stack : err)));

      if (err.stack) {
        debug(failure(String(err.stack)));
      }
    }
  }
}
