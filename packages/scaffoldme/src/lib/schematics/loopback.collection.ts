import { AbstractRunner } from "../runners";
import { AbstractCollection } from "./abstract.collection";
import { SchematicOption } from "./schematic.option";

export interface Schematic {
  name: string;
  alias: string;
}

export class LoopbackCollection extends AbstractCollection {
  private static schematics: Schematic[] = [
    { name: "application", alias: "application" }
  ];

  constructor(runner: AbstractRunner) {
    console.log("constructor loopback collection");
    super("@scaffoldme/schematics", runner);
  }

  public async execute(name: string, options: SchematicOption[]) {
    console.log("execute");

    const schematic: string = this.validate(name);
    await super.execute(schematic, options);
  }

  public static getSchematics(): Schematic[] {
    console.log("get schematics");

    return LoopbackCollection.schematics;
  }

  private validate(name: string) {
    const schematic = LoopbackCollection.schematics.find(
      s => s.name === name || s.alias === name
    );

    if (schematic === undefined || schematic === null) {
      throw new Error(
        `Invalid schematic "${name}". Please, ensure that "${name}" exists in this collection.`
      );
    }
    return schematic.name;
  }
}
