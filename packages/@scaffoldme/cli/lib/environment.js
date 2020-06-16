"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const backEnd_1 = require("./environments/backEnd");
const frontEnd_1 = require("./environments/frontEnd");
class Environment {
    constructor(backend = new backEnd_1.backEnd(), frontend = new frontEnd_1.frontEnd()) {
        this.backend = backend;
        this.frontend = frontend;
    }
    async install(environment) {
        switch (environment.environmentType) {
            case "frontend":
                await this.frontend.install(environment);
                break;
            case "api":
                await this.backend.install(environment);
                break;
            default:
                console.log(chalk_1.default.red(`${environment.environmentType} is not supported right now`));
                process.exit();
        }
    }
}
exports.Environment = Environment;
