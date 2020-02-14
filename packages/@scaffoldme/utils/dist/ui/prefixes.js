"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
exports.ERROR_PREFIX = chalk_1.default.bgRgb(210, 0, 75).bold.rgb(0, 0, 0)(' Error ');
exports.INFO_PREFIX = chalk_1.default.bgRgb(60, 190, 100).bold.rgb(0, 0, 0)(' Info ');
