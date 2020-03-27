"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractCollection {
    constructor(collection, runner) {
        this.collection = collection;
        this.runner = runner;
    }
    async execute(name, options, extraFlags) {
        let command = this.buildCommandLine(name, options);
        command = extraFlags ? command.concat(` ${extraFlags}`) : command;
        console.log("COMMMAND ....", command);
        await this.runner.run(command);
    }
    buildCommandLine(name, options) {
        console.log("collection......", `${this.collection}:${name}${this.buildOptions(options)}`);
        return `${this.collection}:${name}${this.buildOptions(options)}`;
    }
    buildOptions(options) {
        return options.reduce((line, option) => {
            console.log("Lineeee.....", line);
            return line.concat(` ${option.toCommandString()}`);
        }, "");
    }
}
exports.AbstractCollection = AbstractCollection;
