#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const loader_1 = require("../packages/scaffoldme/src/loader");
const bootstrap = () => {
    const program = commander;
    program
        .version(require('../package.json').version)
        .usage('<command> [options]');
    loader_1.Loader.load(program);
    commander.parse(process.argv);
    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
};
bootstrap();
//# sourceMappingURL=scaffoldme.js.map