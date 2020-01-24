"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DockerContainer {
    constructor(environmentName, deps) {
        this.environmentName = environmentName;
        this.name = `${this.environmentName}_app`;
        this.imageName = `${this.environmentName}-app`;
        this.deps = deps;
    }
    /**
     * Installs the environment in a docker container.
     */
    async buildImage() {
        try {
            const path = `${this.deps.ctx.execPath}/${this.environmentName}`;
            await this.deps.shell.run('docker', ['build', '-t', `${this.imageName}:v1`, '.'], { cwd: path });
            return this;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.DockerContainer = DockerContainer;
