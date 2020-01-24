"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_fs_1 = require("@ionic/utils-fs");
const boxen = require("boxen");
const constants_1 = require("../../constants");
const color_1 = require("../color");
const errors_1 = require("../errors");
const docker_1 = require("./docker");
const index_1 = require("./frameworks/angular/index");
const index_2 = require("./frameworks/loopback/index");
class Environment {
    constructor({ id, name, description, environmentType, framework, style, typing, modules }, deps) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.environmentType = environmentType;
        this.typing = typing;
        this.style = style;
        this.modules = modules;
        this.deps = deps;
        this.dockerContainer = new docker_1.DockerContainer(this.name, this.deps);
        this.framework = this.setFramework(framework);
    }
    /**
     * Installs the project in the current folder. A folder is created for each environment with a docker container.
     * @param {IEnvironment} environment Information of the environment to be generated
     */
    async installFramework() {
        try {
            utils_fs_1.mkdirSync(this.name);
            await this.framework.install(this.name);
        }
        catch (e) {
            throw e;
        }
    }
    async buildImage() {
        return this.dockerContainer.buildImage();
    }
    /**
     * Returns an instance of the framework based on the name of the framework
     */
    setFramework(framework) {
        switch (framework.name) {
            case 'angular':
                return new index_1.AngularFramework(this.deps, framework.selectedVersion, constants_1.DEFAULT_PORT_ANGULAR);
            case 'loopback':
                return new index_2.LoopbackFramework(this.deps, framework.selectedVersion, constants_1.DEFAULT_PORT_LOOPBACK);
        }
        throw new errors_1.FatalException(`${color_1.strong(String(framework.name))} framework incompatible`);
    }
    getInfos() {
        const text = `Powered with 💙  by scaffoldme team\n` +
            `Your app runing at http://localhost:${this.framework.port.toString()}\nYour docker container name is : ${this.name}_app\n` +
            `Your docker container image name is : ${this.name}-app:v1`;
        this.deps.log.msg(boxen(text, { padding: 1, margin: 1 }));
    }
}
exports.Environment = Environment;
