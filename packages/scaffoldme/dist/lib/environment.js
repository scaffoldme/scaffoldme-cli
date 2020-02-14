"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const frontEnd_1 = require("./environments/frontEnd");
class Environment {
    async install(environment) {
        switch (environment.environmentType) {
            case "frontend":
                await frontEnd_1.frontEnd.install(environment);
                break;
            case "api":
                console.log("api");
                break;
            default:
                console.log(chalk_1.default.red(`${environment.environmentType} is not supported right now`));
                process.exit();
        }
    }
}
exports.Environment = Environment;
