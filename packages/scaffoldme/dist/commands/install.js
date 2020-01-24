"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const commands_1 = require("../lib/commands");
// const debug = Debug('scaffoldme:commands:install');
class InstallCommand extends commands_1.Command {
    async getMetadata() {
        return {
            name: 'init',
            summary: 'Initialize your project',
            type: 'global',
            description: `This command will initialize the current directory with ${constants_1.PROJECT_FILE}.`,
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
    async preRun(inputs, options) {
        // const force = options.force ? true : false;
        // if (this.project && this.project.details.context === 'app' && !force) {
        //   throw new FatalException(
        //     `Existing Project file found: ${strong(prettyPath(this.project.filePath))}\n` +
        //     `You can re-initialize your project using the ${input('--force')} option.`
        //   );
        // }
    }
    async run(inputs, options, runinfo) {
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
exports.InstallCommand = InstallCommand;
