import chalk from 'chalk';
import * as program from 'commander';
import * as execa from 'execa';
import * as Listr from 'listr';
import { ITechnology } from '../definition';
import { AngularFramework } from '../generators/frameworks/angular';
import { LoopbackFramework } from '../generators/frameworks/loopback';

export class FrameworkCommand {

    public commands() {
        program
            .command('update')
            .alias('u')
            .description('Update Framework of the project')
            .action(() => this.update());
    }

    /**
     * Create folder with framework
     * @param {ITechnology} framework framework information
     * @param {string} folderName Name of the folder that will contain the framework
     */
    public static async install(framework: ITechnology, folderName: string) {
        let port: number = 0;
        let portBind: number = 0;
        switch (framework.name) {
            case 'angular':
                await AngularFramework.install(framework, folderName);
                port = 4200;
                portBind = 80;
                break;
            case 'loopback':
                await LoopbackFramework.install(framework, folderName);
                port = 3000;
                portBind = 3000;
                break;

            default:
                console.log(chalk.red(`${framework.name} is not supported right now`));
                process.exit();

        }
        const frameworkTasks = new Listr([
            {
                title: '📦  Install npm packages',
                task: async () =>
                    execa.shell(`cd ${folderName} && npm install`)
            }]);
        await frameworkTasks.run();
        return { port, portBind };
    }

    private async update() { }


}
