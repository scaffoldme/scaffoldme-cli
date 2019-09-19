import { CommandLineInputs, CommandLineOptions } from '@ionic/cli-framework';
import { PROJECT_FILE } from '../constants';
import { CommandInstanceInfo, CommandMetadata, CommandPreRun } from '../definitions';
import { Command } from '../lib/commands';

// const debug = Debug('scaffoldme:commands:install');

export class InstallCommand extends Command implements CommandPreRun {

  async getMetadata(): Promise<CommandMetadata> {
    return {
      name: 'init',
      summary: 'Initialize your project',
      type: 'global',
      description: `This command will initialize the current directory with ${PROJECT_FILE}.`,
      options: [
        {
          name: 'force',
          summary: 'Initialize even if a project already exists',
          type: Boolean,
          aliases: ['f'],
          default: false,
        },
      ],
    };
  }

  async preRun(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void> {
    // const force = options.force ? true : false;

    // if (this.project && this.project.details.context === 'app' && !force) {
    //   throw new FatalException(
    //     `Existing Project file found: ${strong(prettyPath(this.project.filePath))}\n` +
    //     `You can re-initialize your project using the ${input('--force')} option.`
    //   );
    // }
  }

  async run(inputs: CommandLineInputs, options: CommandLineOptions, runinfo: CommandInstanceInfo): Promise<void> {

    this.deps.log.msg(`⏳ Initialization of the project : ${this.project.details.configScaffoldme.name}`);
    this.deps.log.nl();
    this.deps.log.msg(`🕓 Have a coffee and wait during the installation...`);
    this.deps.log.nl();

    const tasks = this.createTaskChain();
    for (const environment of this.project.environments) {
      tasks.next(`⏳ Initialization of the project : ${environment.name}`);
      await environment.installFramework();
      tasks.next(`🐳  Build docker image`);
      await environment.buildImage();
    }

    for (const environment of this.project.environments) {
      environment.getInfos();
    }

    tasks.end();
  }
}
