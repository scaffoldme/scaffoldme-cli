"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cli_framework_1 = require("@ionic/cli-framework");
const node_1 = require("@ionic/cli-framework/utils/node");
const utils_process_1 = require("@ionic/utils-process");
const Debug = require("debug");
const path = require("path");
const commands_1 = require("./commands");
const guards_1 = require("./guards");
const lib_1 = require("./lib");
const color_1 = require("./lib/color");
const executor_1 = require("./lib/executor");
tslib_1.__exportStar(require("./constants"), exports);
tslib_1.__exportStar(require("./guards"), exports);
const debug = Debug('scaffoldme');
const PACKAGE_ROOT_PATH = path.resolve(__dirname, '..');
const PACKAGE_JSON_PATH = path.resolve(PACKAGE_ROOT_PATH, 'package.json');
let _pkg;
let _executor;
async function loadPackageJson() {
    if (!_pkg) {
        _pkg = await node_1.readPackageJsonFile(PACKAGE_JSON_PATH);
    }
    return _pkg;
}
async function generateContext() {
    const pkg = await loadPackageJson();
    if (!pkg.bin || !pkg.bin.scaffoldme) {
        throw new Error(`Missing "${color_1.strong('bin.scaffoldme')}" in Scaffoldme CLI package.json`);
    }
    if (!pkg.main) {
        throw new Error(`Missing "${color_1.strong('main')}" in in Scaffoldme CLI package.json`);
    }
    return {
        binPath: path.resolve(PACKAGE_ROOT_PATH, pkg.bin.scaffoldme),
        libPath: PACKAGE_ROOT_PATH,
        execPath: process.cwd(),
        version: pkg.version,
    };
}
exports.generateContext = generateContext;
async function loadExecutor(ctx, pargv) {
    if (!_executor) {
        const deps = await lib_1.generateScaffoldmeEnvironment(ctx, pargv);
        const namespace = new commands_1.IonicNamespace(deps);
        _executor = new executor_1.Executor({ namespace });
    }
    return _executor;
}
exports.loadExecutor = loadExecutor;
async function run(pargv) {
    let err;
    let executor;
    try {
        executor = await loadExecutor(await generateContext(), pargv);
    }
    catch (e) {
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
        }
        catch (e) {
            err = e;
        }
    }
    if (err) {
        process.exitCode = 1;
        if (err instanceof cli_framework_1.InputValidationError) {
            for (const e of err.errors) {
                ienv.log.error(e.message);
            }
            ienv.log.msg(`Use the ${color_1.input('--help')} flag for more details.`);
        }
        else if (guards_1.isSuperAgentError(err)) {
            const { formatSuperAgentError } = await Promise.resolve().then(() => require('./lib/http'));
            ienv.log.rawmsg(formatSuperAgentError(err));
        }
        else if (err.code && err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
            ienv.log.error(`Network connectivity error occurred, are you offline?\n` +
                `If you are behind a firewall and need to configure proxy settings, see: ${color_1.strong('https://ion.link/cli-proxy-docs')}\n\n` +
                color_1.failure(String(err.stack ? err.stack : err)));
        }
        else if (guards_1.isExitCodeException(err)) {
            if (err.message) {
                if (err.exitCode > 0) {
                    ienv.log.error(err.message);
                }
                else {
                    ienv.log.msg(err.message);
                }
            }
            await utils_process_1.processExit(err.exitCode);
        }
        else if (err instanceof cli_framework_1.BaseError) {
            ienv.log.error(err.message);
        }
        else {
            ienv.log.msg(color_1.failure(String(err.stack ? err.stack : err)));
            if (err.stack) {
                debug(color_1.failure(String(err.stack)));
            }
        }
    }
}
exports.run = run;
