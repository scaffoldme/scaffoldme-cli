#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var chalk = require('chalk');
var figlet = require('figlet');
var clear = require('clear');
var processData_1 = require("./processData");
var program = require('commander');
var prompt = require('inquirer').prompt;
var ProcessCommand = /** @class */ (function () {
    function ProcessCommand(processData) {
        if (processData === void 0) { processData = new processData_1.ProcessData(); }
        this.processData = processData;
    }
    ProcessCommand.prototype.run = function () {
        var _this = this;
        // Technologies Questions
        var questions = [
            { type: 'list', name: 'name', message: 'Techno name', choices: ["techno A", "techno B"] },
            { type: 'input', name: 'version', message: 'enter version of techno' },
            { type: 'confirm', name: 'prefer1', message: 'Do you prefer your 1?', "default": false },
            { type: 'confirm', name: 'prefer2', message: 'Do you prefer your 2?', "default": false },
        ];
        program
            .version('1.0.0')
            .description('HAAKILY CLI');
        // Init Command
        program
            .command('init')
            .alias('i')
            .description('Init ')
            .action(function () { return _this.processData.init(); });
        // Add Command
        program
            .command('add')
            .alias('a')
            .description('add new')
            //.action(() => this.processData.add());
            .action(function () {
            prompt(questions)
                .then(function (answers) {
                _this.processData.add(answers);
            });
        });
        // start Command
        program
            .command('start')
            .alias('s')
            .description('start container and server')
            .action(function () { return _this.processData.start(); });
        //start all command
        program.parse(process.argv);
        if (!process.argv.slice(2).length) {
            clear();
            console.log(chalk.yellow(figlet.textSync("HAAKILY-CLI", {
                font: "Epic",
                horizontalLayout: "default",
                verticalLayout: "default"
            })));
            program.outputHelp();
        }
    };
    return ProcessCommand;
}());
exports.ProcessCommand = ProcessCommand;
