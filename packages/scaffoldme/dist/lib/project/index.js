"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = require("@ionic/cli-framework/utils/format");
const utils_fs_1 = require("@ionic/utils-fs");
const Debug = require("debug");
const path = require("path");
const constants_1 = require("../../constants");
const guards_1 = require("../../guards");
const color_1 = require("../color");
const errors_1 = require("../errors");
const environment_1 = require("./environment");
const debug = Debug('scaffoldme:lib:project');
class ProjectDetailsError extends errors_1.BaseException {
    constructor(msg, 
    /**
     * Unique code for this error.
     */
    code, 
    /**
     * The underlying error that caused this error.
     */
    error) {
        super(msg);
        this.code = code;
        this.error = error;
    }
}
exports.ProjectDetailsError = ProjectDetailsError;
class ProjectDetails {
    constructor({ rootDirectory, args = { _: [] }, e }) {
        this.rootDirectory = rootDirectory;
        this.e = e;
        this.args = args;
    }
    processResult(result) {
        const { log } = this.e;
        // const errorCodes = result.errors.map((e) => e.code);
        const e1 = result.errors.find((e) => e.code === 'ERR_INVALID_PROJECT_FILE');
        const e2 = result.errors.find((e) => e.code === 'ERR_FILE_NOT_FOUND');
        if (e1) {
            log.error(`Error while loading config (project config: ${color_1.strong(format_1.prettyPath(result.configPath))})\n` +
                `${e1.error ? `${e1.message}: ${color_1.failure(e1.error.toString())}` : color_1.failure(e1.message)}. ` +
                `Run ${color_1.input('scaffoldme init')} to re-initialize your Scaffoldme project. Without a valid project config, the CLI will not have project context.`);
            log.nl();
        }
        if (e2) {
            log.error(`${e2.message} (project config: ${color_1.strong(format_1.prettyPath(result.configPath))}).\n`);
            log.nl();
        }
    }
    async readConfig(p) {
        try {
            let configContents = await utils_fs_1.readFile(p, { encoding: 'utf8' });
            if (!configContents) {
                configContents = '{}\n';
                await utils_fs_1.writeFile(p, configContents, { encoding: 'utf8' });
            }
            return await JSON.parse(configContents);
        }
        catch (e) {
            throw new ProjectDetailsError('Could not read project file', 'ERR_INVALID_PROJECT_FILE', e);
        }
    }
    /**
     * Gather project details from specified configuration.
     *
     * This method will always resolve with a result object, with an array of
     * errors. Use `processResult()` to log warnings & errors.
     */
    async result() {
        const errors = [];
        const configPath = path.resolve(this.rootDirectory, constants_1.PROJECT_FILE);
        let config;
        try {
            config = await this.readConfig(configPath);
        }
        catch (e) {
            errors.push(e);
            throw new ProjectDetailsError(`${constants_1.PROJECT_FILE} not found`, 'ERR_FILE_NOT_FOUND');
        }
        if (!guards_1.isValidProject(config)) {
            throw new ProjectDetailsError('Unknown project file structure', 'ERR_INVALID_PROJECT_FILE');
        }
        if (guards_1.isInstalledProject(config)) {
            return { configPath, errors, ...{ configScaffoldme: config, context: 'installedProject' } };
        }
        return { configPath, errors, ...{ configScaffoldme: config, context: 'unknown' } };
    }
}
exports.ProjectDetails = ProjectDetails;
async function loadProjectFromProjectFile(rootDirectory, args, deps) {
    const details = new ProjectDetails({ rootDirectory, args, e: deps });
    const result = await details.result();
    debug('Project details: %o', { ...result, errors: result.errors.map((e) => e.code) });
    return new Project(result, deps);
}
exports.loadProjectFromProjectFile = loadProjectFromProjectFile;
class Project {
    constructor(details, deps) {
        this.details = details;
        this.deps = deps;
        this.rootDirectory = path.dirname(details.configPath);
        this.environments = [];
        for (const configEnvironment of this.details.configScaffoldme.environments) {
            this.environments.push(new environment_1.Environment(configEnvironment, this.deps));
        }
    }
    get filePath() {
        return this.details.configPath;
    }
    get directory() {
        return this.rootDirectory;
    }
    async getInfo() {
        return [];
    }
}
exports.Project = Project;
