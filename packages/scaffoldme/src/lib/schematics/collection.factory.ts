import { Runner, RunnerFactory } from "../runners";
import { SchematicRunner } from "../runners/schematic.runner";
import { AbstractCollection } from "./abstract.collection";
import { Collection } from "./collection";
import { CustomCollection } from "./custom.collection";
import { LoopbackCollection } from "./loopback.collection";

export class CollectionFactory {
  public static create(collection: Collection | string): AbstractCollection {
    console.log("...........create collection");

    switch (collection) {
      case Collection.SCAFFOLDME:
        return new LoopbackCollection(
          RunnerFactory.create(Runner.SCHEMATIC) as SchematicRunner
        );

      default:
        return new CustomCollection(
          collection,
          RunnerFactory.create(Runner.SCHEMATIC) as SchematicRunner
        );
    }
  }
}
