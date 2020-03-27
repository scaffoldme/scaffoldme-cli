"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = require("./ui/emojis");
exports.MESSAGES = {
    SCAFFOLDME_JSON_FILE_NOT_EXIST: `scaffoldme.json file was not found`,
    PROJECT_START: `Installation in progress... ${emojis_1.EMOJIS.COFFEE}`,
    RUNNER_EXECUTION_ERROR: (command) => `\nFailed to execute command: ${command}`
};
