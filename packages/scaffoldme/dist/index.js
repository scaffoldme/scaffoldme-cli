"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("@scaffoldme/utils");
const jsonfile = require("jsonfile");
tslib_1.__exportStar(require("./actions"), exports);
tslib_1.__exportStar(require("./loader"), exports);
let projectJson;
exports.project = projectJson;
exports.loadScaffoldmeJson = async () => {
    projectJson = await jsonfile.readFile(utils_1.PROJECT_FILE);
    exports.project = projectJson;
    return projectJson;
};
