"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_subprocess_1 = require("@ionic/utils-subprocess");
/**
 * Resolves pkg manager intent with command args.
 *
 * TODO: this is a weird function and should be split up
 *
 * @return Promise<args> If the args is an empty array, it means the pkg manager doesn't have that command.
 */
async function pkgManagerArgs(npmClient, options) {
    let vocab;
    const cmd = options.command;
    if (cmd === 'dedupe') {
        delete options.pkg;
    }
    if (cmd === 'dedupe' || cmd === 'rebuild') {
        delete options.global;
        delete options.save;
        delete options.saveDev;
    }
    if (cmd === 'dedupe' || cmd === 'rebuild' || cmd === 'uninstall') {
        delete options.saveExact;
    }
    if (cmd === 'install' || cmd === 'uninstall') {
        if (options.global) {
            // Turn off all save flags for global context
            options.save = false;
            options.saveDev = false;
            options.saveExact = false;
        }
        else if (options.pkg && typeof options.save === 'undefined' && typeof options.saveDev === 'undefined') {
            // Prefer save flag
            options.save = true;
        }
        if (cmd === 'install' && options.pkg && typeof options.saveExact === 'undefined') {
            // For single package installs, prefer to save exact versions
            options.saveExact = true;
        }
    }
    const installerArgs = [];
    if (npmClient === 'npm') {
        vocab = {
            run: 'run',
            install: 'i',
            bareInstall: 'i',
            uninstall: 'uninstall',
            dedupe: 'dedupe',
            rebuild: 'rebuild',
            global: '-g',
            save: '--save',
            saveDev: '-D',
            saveExact: '-E',
            nonInteractive: ''
        };
    }
    else if (npmClient === 'yarn') {
        vocab = {
            run: 'run',
            install: 'add',
            bareInstall: 'install',
            uninstall: 'remove',
            dedupe: '',
            rebuild: 'install',
            global: '',
            save: '',
            saveDev: '--dev',
            saveExact: '--exact',
            nonInteractive: '--non-interactive'
        };
        if (options.global) {
            // yarn installs packages globally under the 'global' prefix, instead of having a flag
            installerArgs.push('global');
        }
    }
    else {
        throw new Error(`unknown installer: ${npmClient}`);
    }
    if (cmd === 'install') {
        if (options.pkg) {
            installerArgs.push(vocab.install);
        }
        else {
            installerArgs.push(vocab.bareInstall);
        }
    }
    else if (cmd === 'uninstall') {
        installerArgs.push(vocab.uninstall);
    }
    else if (cmd === 'dedupe') {
        if (vocab.dedupe) {
            installerArgs.push(vocab.dedupe);
        }
        else {
            return [];
        }
    }
    else if (cmd === 'rebuild') {
        installerArgs.push(vocab.rebuild);
    }
    else {
        installerArgs.push(cmd);
    }
    if (options.global && vocab.global) {
        installerArgs.push(vocab.global);
    }
    if (options.save && vocab.save) {
        installerArgs.push(vocab.save);
    }
    if (options.saveDev && vocab.saveDev) {
        installerArgs.push(vocab.saveDev);
    }
    if (options.saveExact && vocab.saveExact) {
        installerArgs.push(vocab.saveExact);
    }
    if (vocab.nonInteractive) {
        // Some CLIs offer a flag that disables all interactivity, which we want to opt-into
        installerArgs.push(vocab.nonInteractive);
    }
    if (options.pkg) {
        installerArgs.push(options.pkg);
    }
    if (cmd === 'run' && options.script) {
        installerArgs.push(options.script);
    }
    if (npmClient === 'yarn') {
        if (cmd === 'rebuild') {
            installerArgs.push('--force');
        }
    }
    if (cmd === 'run' && options.script && options.scriptArgs && options.scriptArgs.length > 0) {
        if (npmClient === 'npm') {
            installerArgs.push('--');
        }
        for (const arg of options.scriptArgs) {
            installerArgs.push(arg);
        }
    }
    if (options.json) {
        installerArgs.push('--json');
    }
    return [npmClient, ...installerArgs];
}
exports.pkgManagerArgs = pkgManagerArgs;
/**
 * @return Promise<package.json on registry or `undefined`>
 */
async function pkgFromRegistry(npmClient, options) {
    const [manager, ...managerArgs] = await pkgManagerArgs(npmClient, { command: 'info', json: true, ...options });
    const cmd = new utils_subprocess_1.Subprocess(manager, managerArgs);
    const result = await cmd.output();
    if (result) {
        const json = JSON.parse(result);
        return manager === 'yarn' ? json.data : json;
    }
}
exports.pkgFromRegistry = pkgFromRegistry;
