"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const constants_1 = require("../../../../constants");
class AngularFramework extends __1.Framework {
    constructor(deps, selectedVersion, port) {
        super(selectedVersion, deps);
        this.name = 'angular';
        this.port = port ? constants_1.DEFAULT_PORT_ANGULAR : port;
    }
    async install(environmentName) {
        await this.deps.shell.run('git', ['clone', `https://github.com/scaffoldme/${this.name}-starter.git`, '--progress', environmentName], { stdio: 'inherit' });
    }
}
exports.AngularFramework = AngularFramework;
