// import * as program from 'commander';
import * as boxen from 'boxen';
import chalk from 'chalk';
import * as fs from 'fs';
import { IEnvironment } from '../definition';
import { DockerCommand } from './docker-command';
import { FrameworkCommand } from './framework-command';

export class EnvironmentCommand {

    /**
     * Installs the project in the current folder. A folder is created for each environment with a docker container.
     * @param {IEnvironment} environment Information of the environment to be generated
     */
    public static async install(environment: IEnvironment) {
        console.log(chalk.bgCyan(`${environment.framework.name} \n`));
        fs.mkdirSync(environment.environmentType);
        const { port, portBind } = await FrameworkCommand.install(environment.framework, environment.environmentType);
        const { containerName, imageName } = await DockerCommand.install(environment.environmentType, port, portBind);
        this.successfulInstallation(port, containerName, imageName);
    }

    private static async successfulInstallation(port: number, containerName: string, imageName: string) {
        let text: string = 'Powered with 💙 by scaffoldme team\n' +
            'Your app runing at http://localhost:<port>\nYour docker container name is : <container-name>\n' +
            'Your docker container image name is : <image-name>:v1';
        text = text.replace('<port>', port.toString());
        text = text.replace('<container-name>', containerName);
        text = text.replace('<image-name>', imageName);
        await console.log(boxen(text, { padding: 1, margin: 1 }));
    }

}
