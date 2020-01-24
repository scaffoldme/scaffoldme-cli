"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_framework_1 = require("@ionic/cli-framework");
const chalk_1 = require("chalk");
const color_1 = require("../color");
class Logger extends cli_framework_1.Logger {
    ok(msg) {
        this.log({ ...this.createRecord(`${color_1.weak('[')}${chalk_1.default.bold.green('OK')}${color_1.weak(']')} ${msg}`), format: false });
    }
    rawmsg(msg) {
        this.log({ ...this.createRecord(msg), format: false });
    }
}
exports.Logger = Logger;
function createFormatter(options = {}) {
    const prefix = process.argv.includes('--log-timestamps') ? () => `${color_1.weak('[' + new Date().toISOString() + ']')}` : '';
    return cli_framework_1.createTaggedFormatter({ prefix, titleize: true, wrap: true, ...options });
}
exports.createFormatter = createFormatter;
function createDefaultLoggerHandlers(formatter = createFormatter()) {
    return new Set([...cli_framework_1.DEFAULT_LOGGER_HANDLERS].map((handler) => handler.clone({ formatter })));
}
exports.createDefaultLoggerHandlers = createDefaultLoggerHandlers;
