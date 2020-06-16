"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadScaffoldmeJson = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("@scaffoldme/utils");
const jsonfile = require("jsonfile");
tslib_1.__exportStar(require("./actions"), exports);
tslib_1.__exportStar(require("./input"), exports);
tslib_1.__exportStar(require("./lib"), exports);
tslib_1.__exportStar(require("./loader"), exports);
// let projectJson: Project | undefined;
// export let project: Project | undefined = projectJson;
exports.loadScaffoldmeJson = async () => {
    const projectJson = await jsonfile.readFile(utils_1.PROJECT_FILE);
    return projectJson;
};
