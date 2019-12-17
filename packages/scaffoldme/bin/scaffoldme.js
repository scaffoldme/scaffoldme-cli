#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const src_1 = require("../dist/loader");
const bootstrap = () => {
    const program = commander;
    program
        .version(require('../package.json').version)
        .usage('<command> [options]');

        src_1.Loader.load(program);

    commander.parse(process.argv);
    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
};
bootstrap();
