import { Api, EnvironmentInfosWithRelations } from '@scaffoldme/core';
import { MESSAGES, PROJECT_FILE } from '@scaffoldme/utils';
import chalk from 'chalk';
import * as fs from 'fs';
import { Loopback } from '../generator/loopback';
import { NestjsGenerator } from '../generator/nestjs';

const shell = require('shelljs');
const boxen = require('boxen');

export class backEnd {
  constructor(
    public loopback: Loopback = new Loopback(),
    private nestjs: NestjsGenerator = new NestjsGenerator()
  ) {}

  async install(environment: EnvironmentInfosWithRelations) {
    /* if (
      shell.exec(`git clone ${environment.depot} ${environment.name}`) !== 0
    ) { */
    shell.cd(environment.name);
    if (!fs.existsSync(PROJECT_FILE)) {
      console.error(chalk.red(MESSAGES.SCAFFOLDME_JSON_FILE_NOT_EXIST));
      process.exit(0);
    }
    const jsonScaffoldmeBackEnd: Api = JSON.parse(
      fs.readFileSync(PROJECT_FILE, 'utf8')
    );

    switch (jsonScaffoldmeBackEnd.framework?.technologyName) {
      case 'Loopback':
        const loopback = this.loopback.getListTask(jsonScaffoldmeBackEnd);
        await loopback.run();
        await console.log(
          boxen(
            'Powered with 💓 by scaffoldme team\nYour app runing at http://localhost:3000\nYour docker container name is : loopback_app\nYour docker container image name is : loopback-app:v1',
            { padding: 1, margin: 1, borderStyle: 'double' }
          )
        );
        /* await this.installLoopackFramework(
          jsonScaffoldmeBackEnd,
          inputs,
          options
        ); */
        shell.cd('..');
        break;
      case 'NestJs':
        const nestjs = this.nestjs.getListTask(jsonScaffoldmeBackEnd);
        await nestjs.run().catch(
          (err) => console.log(err)
        );
        await console.log(
          boxen(
            'Powered with 💓 by scaffoldme team\nYour app runing at http://localhost:5000\nYour docker container name is : nestjs_app\nYour docker container image name is : nestjs-app:v1',
            { padding: 1, margin: 1, borderStyle: 'double' }
          )
        );
        /* await this.installLoopackFramework(
          jsonScaffoldmeBackEnd,
          inputs,
          options
        ); */
        shell.cd('..');
        break;

      default:
        console.log(
          chalk.red(
            `${jsonScaffoldmeBackEnd.framework?.technologyName} is not supported right now`
          )
        );
        process.exit();
    }
    // }
  }

  /*  private static async installLoopackFramework(
    loopback: Api,
    inputs: Input[],
    options: Input[]
  ) {
    console.log(
      chalk.yellowBright(
        `Installation du Framework ${loopback.framework?.technologyName} `
      )
    );

    let runner = new SchematicRunner();
    await shell.exec(
      `${runner.findClosestSchematicsBinary()} @scaffoldme/schematics-loopback:application`
    );

    await shell.exec("mv Dockerfile.template Dockerfile && npm i");

  } */
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
