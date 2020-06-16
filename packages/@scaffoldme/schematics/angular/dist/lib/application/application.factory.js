"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const path_1 = require("path");
const default_1 = require("../default");
function main(options) {
    options.name = core_1.strings.dasherize(options.name ? options.name : "");
    const path = !options.directory || options.directory === "undefined"
        ? options.name
        : options.directory;
    options = transform(options);
    return schematics_1.mergeWith(generate(options, path));
}
exports.main = main;
function transform(options) {
    const target = Object.assign({}, options);
    target.author = !!target.author ? target.author : default_1.DEFAULT_AUTHOR;
    target.description = !!target.description
        ? target.description
        : default_1.DEFAULT_DESCRIPTION;
    target.language = !!target.language ? target.language : default_1.DEFAULT_LANGUAGE;
    target.name = resolvePackageName(target.name ? target.name : ".");
    target.version = !!target.version ? target.version : default_1.DEFAULT_VERSION;
    target.packageManager =
        !target.packageManager || target.packageManager === "undefined"
            ? "npm"
            : target.packageManager;
    target.dependencies = !!target.dependencies ? target.dependencies : "";
    target.devDependencies = !!target.devDependencies
        ? target.devDependencies
        : "";
    return target;
}
function resolvePackageName(path) {
    const { name } = path_1.parse(path);
    if (name === ".") {
        return path_1.basename(process.cwd());
    }
    return name;
}
function generate(options, path) {
    return schematics_1.apply(schematics_1.url(core_1.join("./files", options.language ? options.language : "ts")), [
        schematics_1.template({
            ...core_1.strings,
            ...options
        }),
        schematics_1.move(path)
    ]);
}
