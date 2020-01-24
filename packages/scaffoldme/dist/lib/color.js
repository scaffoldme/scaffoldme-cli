"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_framework_1 = require("@ionic/cli-framework");
const chalk_1 = require("chalk");
const HELP_COLORS = {
    title: chalk_1.default.bold,
};
exports.COLORS = { ...cli_framework_1.DEFAULT_COLORS, help: { ...cli_framework_1.DEFAULT_COLORS.help, ...HELP_COLORS } };
exports.strong = exports.COLORS.strong, exports.weak = exports.COLORS.weak, exports.input = exports.COLORS.input, exports.success = exports.COLORS.success, exports.failure = exports.COLORS.failure, exports.ancillary = exports.COLORS.ancillary, exports.title = exports.COLORS.help.title;
