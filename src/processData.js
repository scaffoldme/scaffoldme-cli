#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var chalk = require("chalk");
var parserData_1 = require("./parserData");
var fs = require("fs");
var jsonfile = require("jsonfile");
var fileHelper_1 = require("./fileHelper");
var shell = require("shelljs");
var userHome = require('user-home');
var dirnames = {
    haakily: "HAAKILY"
};
var ProcessData = /** @class */ (function () {
    function ProcessData(fileHelper, parseData) {
        if (fileHelper === void 0) { fileHelper = new fileHelper_1.FileHelper(); }
        if (parseData === void 0) { parseData = new parserData_1.ParserData(); }
        this.fileHelper = fileHelper;
        this.parseData = parseData;
    }
    ProcessData.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file, isDir;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shell.exec('./scripts/installed-dependencies.sh');
                        file = "./package.json";
                        return [4 /*yield*/, fileHelper_1.FileHelper.createDirectory(dirnames.haakily)];
                    case 1:
                        isDir = _a.sent();
                        if (isDir) {
                            console.log(chalk["default"].green(dirnames.haakily + " folder created !!"));
                        }
                        shell.cd(dirnames.haakily);
                        /* if (shell.exec('ng new front-end --routing=false --style=scss').code == 0) {
                            console.log(chalk.default.green("Installation angular Done !! "));
                            
                            shell.cd('front-end');
                
                            /* add command to create all model and service in angular project */
                        /*const packageJSON: packageJSON = await jsonfile.readFile(file);
                        packageJSON.scripts.haakily =
                        "openapi-generator generate -i ./haakily.json -g typescript-angular -o generated-sources/openapi --additional-properties='ngVersion=6.1.7'";
                        await jsonfile.writeFile(file, packageJSON);
                        
                    } */
                        /***Installation Back-end Loopback */
                        //shell.mkdir('-p', 'back-end');
                        console.log(chalk["default"].green('end init'));
                        return [2 /*return*/];
                }
            });
        });
    };
    ProcessData.prototype.add = function (data) {
        console.log(chalk["default"].green("add"));
        console.log(data);
    };
    ProcessData.prototype.update = function () {
        console.log(chalk["default"].green("update"));
    };
    ProcessData.prototype.start = function () {
        console.log(chalk["default"].green("start"));
    };
    ProcessData.prototype.restart = function () {
        console.log(chalk["default"].green("restart"));
    };
    return ProcessData;
}());
exports.ProcessData = ProcessData;
