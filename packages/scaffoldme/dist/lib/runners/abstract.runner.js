"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("@scaffoldme/utils");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const child_process_1 = require("child_process");
class AbstractRunner {
    constructor(binary) {
        this.binary = binary;
    }
    async run(command, collect = false, cwd = process.cwd()) {
        console.log("COMMAND IN ABSTRACT RUNNER", command);
        const args = [command];
        const options = {
            cwd,
            stdio: collect ? "pipe" : "inherit",
            shell: true
        };
        return new Promise((resolve, reject) => {
            const child = child_process_1.spawn(`${this.binary}`, args, options);
            console.log("CHILDDD .. ,", child);
            if (collect) {
                console.log("COLLECTE..", collect);
                child.stdout.on("data", data => resolve(data.toString().replace(/\r\n|\n/, "")));
            }
            child.on("close", code => {
                if (code === 0) {
                    resolve(null);
                }
                else {
                    console.error(chalk_1.default.red(utils_1.MESSAGES.RUNNER_EXECUTION_ERROR(`${this.binary} ${command}`)));
                    reject();
                }
            });
        });
    }
}
exports.AbstractRunner = AbstractRunner;
