"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runners_1 = require("../runners");
const collection_1 = require("./collection");
const custom_collection_1 = require("./custom.collection");
const loopback_collection_1 = require("./loopback.collection");
class CollectionFactory {
    static create(collection) {
        console.log("...........create collection");
        switch (collection) {
            case collection_1.Collection.SCAFFOLDME:
                return new loopback_collection_1.LoopbackCollection(runners_1.RunnerFactory.create(runners_1.Runner.SCHEMATIC));
            default:
                return new custom_collection_1.CustomCollection(collection, runners_1.RunnerFactory.create(runners_1.Runner.SCHEMATIC));
        }
    }
}
exports.CollectionFactory = CollectionFactory;
