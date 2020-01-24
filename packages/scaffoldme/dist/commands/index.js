"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const namespace_1 = require("../lib/namespace");
class IonicNamespace extends namespace_1.Namespace {
    constructor({ env, project }) {
        super(undefined);
        this._env = env;
        this._project = project;
    }
    get project() {
        return this._project;
    }
    set project(p) {
        this._project = p;
    }
    get env() {
        return this._env;
    }
    set env(env) {
        this._env = env;
    }
    async getMetadata() {
        return {
            name: 'ionic',
            summary: '',
        };
    }
    async getNamespaces() {
        return new namespace_1.NamespaceMap([]);
    }
    async getCommands() {
        return new namespace_1.CommandMap([
            ['install', async () => { const { InstallCommand } = await Promise.resolve().then(() => require('./install')); return new InstallCommand(this); }],
        ]);
    }
}
exports.IonicNamespace = IonicNamespace;
