"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_collection_1 = require("./abstract.collection");
class LoopbackCollection extends abstract_collection_1.AbstractCollection {
    constructor(runner) {
        console.log("constructor loopback collection");
        super("@scaffoldme/schematics", runner);
    }
    async execute(name, options) {
        console.log("execute");
        const schematic = this.validate(name);
        await super.execute(schematic, options);
    }
    static getSchematics() {
        console.log("get schematics");
        return LoopbackCollection.schematics;
    }
    validate(name) {
        const schematic = LoopbackCollection.schematics.find(s => s.name === name || s.alias === name);
        if (schematic === undefined || schematic === null) {
            throw new Error(`Invalid schematic "${name}". Please, ensure that "${name}" exists in this collection.`);
        }
        return schematic.name;
    }
}
exports.LoopbackCollection = LoopbackCollection;
LoopbackCollection.schematics = [
    { name: "application", alias: "application" }
];
