"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("@scaffoldme/utils");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const fs = tslib_1.__importStar(require("fs"));
class Project {
    constructor() {
        this.data = {
            name: "",
            description: ""
        };
    }
    load() {
        if (!fs.existsSync(utils_1.PROJECT_FILE)) {
            console.error(chalk_1.default.red(utils_1.MESSAGES.SCAFFOLDME_JSON_FILE_NOT_EXIST));
            process.exit(0);
        }
        this.data = JSON.parse(fs.readFileSync(utils_1.PROJECT_FILE, "utf8"));
    }
    getProjectName() {
        if (this.data && this.data.name) {
            return this.data.name;
        }
        else {
            return "Scafoldme Project";
        }
    }
    getEnvironments() {
        return this.data.environmentsInfos || [];
    }
}
exports.Project = Project;
