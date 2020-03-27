import { Api, EnvironmentInfosWithRelations, Input } from "@scaffoldme/core";
import { MESSAGES, PROJECT_FILE } from "@scaffoldme/utils";
import chalk from "chalk";
import * as fs from "fs";
var shell = require("shelljs");

export class backEnd {
  public static async install(
    environment: EnvironmentInfosWithRelations,
    inputs: Input[],
    options: Input[]
  ) {
    if (
      shell.exec(`git clone ${environment.depot} ${environment.name}`) !== 0
    ) {
      shell.cd(environment.name);
      if (!fs.existsSync(PROJECT_FILE)) {
        console.error(chalk.red(MESSAGES.SCAFFOLDME_JSON_FILE_NOT_EXIST));
        process.exit(0);
      }
      const jsonScaffoldmeBackEnd: Api = JSON.parse(
        fs.readFileSync(PROJECT_FILE, "utf8")
      );

      switch (jsonScaffoldmeBackEnd.framework?.technologyName) {
        case "Loopback":
          await this.installLoopackFramework(
            jsonScaffoldmeBackEnd,
            inputs,
            options
          );
          shell.cd("..");
          break;

        default:
          console.log(
            chalk.red(
              `${jsonScaffoldmeBackEnd.framework?.technologyName} is not supported right now`
            )
          );
          process.exit();
      }
    }
  }

  private static async installLoopackFramework(
    loopback: Api,
    inputs: Input[],
    options: Input[]
  ) {
    console.log(
      chalk.yellowBright(
        `Installation du Framework ${loopback.framework?.technologyName} `
      )
    );

    await shell.exec(
      "/home/mahamadou/Documents/Projects/ETNA/scaffoldme-cli/packages/scaffoldme/node_modules/.bin/schematics @scaffoldme/schematics-loopback:application"
    );

    // await generateApplicationFiles(inputs, options);

    /* const { stdout, stderr } = await shell.exec(
      "/home/mahamadou/Documents/Projects/ETNA/scaffoldme-cli/packages/scaffoldme/node_modules/.bin/schematics @scaffoldme/schematics-loopback:application"
    );
    console.log({ stdout, stderr }); */
  }
}

/* const generateApplicationFiles = async (args: Input[], options: Input[]) => {
  console.log("options ....", options);

  const collectionName = options.find(
    option => option.name === "collection" && option.value != null
  )!.value;
  //creation de la collection
  const collection: AbstractCollection = CollectionFactory.create(
    (collectionName as Collection) || Collection.SCAFFOLDME
  );
  console.log("collectionnnnnnnnnn......", collection);
  const schematicOptions: SchematicOption[] = mapSchematicOptions(
    args.concat(options)
  );

  console.log("Schematics Options...", schematicOptions);

  await collection.execute("loopback/application", schematicOptions);
  console.info();
};

const mapSchematicOptions = (options: Input[]): SchematicOption[] => {
  return options.reduce(
    (schematicOptions: SchematicOption[], option: Input) => {
      if (
        option.name !== "skip-install" &&
        option.value !== "package-manager"
      ) {
        schematicOptions.push(new SchematicOption(option.name, option.value));
      }
      return schematicOptions;
    },
    []
  );
}; */
