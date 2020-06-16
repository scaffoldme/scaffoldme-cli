"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backEnd = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("@scaffoldme/utils");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const fs = tslib_1.__importStar(require("fs"));
const loopback_1 = require("../generator/loopback");
var shell = require("shelljs");
const boxen = require("boxen");
class backEnd {
    constructor(loopback = new loopback_1.Loopback()) {
        this.loopback = loopback;
    }
    async install(environment) {
        var _a, _b;
        /* if (
          shell.exec(`git clone ${environment.depot} ${environment.name}`) !== 0
        ) { */
        shell.cd(environment.name);
        if (!fs.existsSync(utils_1.PROJECT_FILE)) {
            console.error(chalk_1.default.red(utils_1.MESSAGES.SCAFFOLDME_JSON_FILE_NOT_EXIST));
            process.exit(0);
        }
        const jsonScaffoldmeBackEnd = JSON.parse(fs.readFileSync(utils_1.PROJECT_FILE, "utf8"));
        switch ((_a = jsonScaffoldmeBackEnd.framework) === null || _a === void 0 ? void 0 : _a.technologyName) {
            case "Loopback":
                const loopback = this.loopback.getListTask(jsonScaffoldmeBackEnd);
                await loopback.run();
                await console.log(boxen("Powered with 💓 by scaffoldme team\nYour app runing at http://localhost:3000\nYour docker container name is : loopback_app\nYour docker container image name is : loopback-app:v1", { padding: 1, margin: 1, borderStyle: "double" }));
                /* await this.installLoopackFramework(
                  jsonScaffoldmeBackEnd,
                  inputs,
                  options
                ); */
                shell.cd("..");
                break;
            default:
                console.log(chalk_1.default.red(`${(_b = jsonScaffoldmeBackEnd.framework) === null || _b === void 0 ? void 0 : _b.technologyName} is not supported right now`));
                process.exit();
        }
        // }
    }
}
exports.backEnd = backEnd;
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
