"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
// import { frontEnd } from "./environments/frontEnd";
const backEnd_1 = require("./environments/backEnd");
class Environment {
    async install(environment, inputs, options) {
        switch (environment.environmentType) {
            case "frontend":
                // await frontEnd.install(environment);
                break;
            case "api":
                await backEnd_1.backEnd.install(environment, inputs, options);
                break;
            default:
                console.log(chalk_1.default.red(`${environment.environmentType} is not supported right now`));
                process.exit();
        }
    }
}
exports.Environment = Environment;
