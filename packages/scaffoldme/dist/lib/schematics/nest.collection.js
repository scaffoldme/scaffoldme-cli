"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_collection_1 = require("./abstract.collection");
class NestCollection extends abstract_collection_1.AbstractCollection {
    constructor(runner) {
        console.log("constructor nest collection");
        super("@scaffoldme/schematics", runner);
    }
    async execute(name, options) {
        console.log("execute");
        const schematic = this.validate(name);
        await super.execute(schematic, options);
    }
    static getSchematics() {
        console.log("get schematics");
        return NestCollection.schematics;
    }
    validate(name) {
        const schematic = NestCollection.schematics.find(s => s.name === name || s.alias === name);
        if (schematic === undefined || schematic === null) {
            throw new Error(`Invalid schematic "${name}". Please, ensure that "${name}" exists in this collection.`);
        }
        return schematic.name;
    }
}
exports.NestCollection = NestCollection;
NestCollection.schematics = [
    { name: "application", alias: "application" },
    { name: "angular-app", alias: "ng-app" },
    { name: "class", alias: "cl" },
    { name: "configuration", alias: "config" },
    { name: "controller", alias: "co" },
    { name: "decorator", alias: "d" },
    { name: "filter", alias: "f" },
    { name: "gateway", alias: "ga" },
    { name: "guard", alias: "gu" },
    { name: "interceptor", alias: "in" },
    { name: "interface", alias: "interface" },
    { name: "middleware", alias: "mi" },
    { name: "module", alias: "mo" },
    { name: "pipe", alias: "pi" },
    { name: "provider", alias: "pr" },
    { name: "resolver", alias: "r" },
    { name: "service", alias: "s" },
    { name: "library", alias: "lib" },
    { name: "sub-app", alias: "app" }
];
