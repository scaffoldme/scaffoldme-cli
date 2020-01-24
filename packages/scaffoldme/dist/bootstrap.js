"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("@ionic/cli-framework/utils/node");
const chalk_1 = require("chalk");
const Debug = require("debug");
const path = require("path");
const semver = require("semver");
const color_1 = require("./lib/color");
if (process.argv.includes('--no-color')) {
    chalk_1.default.enabled = false;
}
const debug = Debug('scaffoldme:bootstrap');
exports.ERROR_BASE_DIRECTORY_NOT_FOUND = 'BASE_DIRECTORY_NOT_FOUND';
exports.ERROR_LOCAL_CLI_NOT_FOUND = 'LOCAL_CLI_NOT_FOUND';
exports.ERROR_VERSION_TOO_OLD = 'VERSION_TOO_OLD';
async function detectLocalCLI() {
    let pkgPath;
    try {
        pkgPath = require.resolve('../../package', { paths: node_1.compileNodeModulesPaths(process.cwd()) });
    }
    catch (e) {
        // ignore
    }
    if (pkgPath && process.env.SCAFFOLDME_CLI_LIB !== path.dirname(pkgPath)) {
        const pkg = await node_1.readPackageJsonFile(pkgPath);
        debug(`local CLI ${color_1.strong(pkg.version)} found at ${color_1.strong(pkgPath)}`);
        if (semver.lt(pkg.version, '4.0.0')) {
            throw exports.ERROR_VERSION_TOO_OLD;
        }
        return path.dirname(pkgPath);
    }
    throw exports.ERROR_LOCAL_CLI_NOT_FOUND;
}
exports.detectLocalCLI = detectLocalCLI;
