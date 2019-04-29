import * as execa from 'execa';
import * as Listr from 'listr';

export class DockerCommand {

    public commands() { }

    /**
     * Create container for one environment
     * @param {string} environmentName environment name
     */
    public static async install(environmentName: string, port: number, portBind: number) {
        const containerName: string = `${environmentName}_app`;
        const imageName: string = `${environmentName}-app`;
        const environmentTasks = new Listr(
            [
                {
                    title: '🐳  Build docker image',
                    task: () =>
                        execa.shell(`cd ${environmentName} && docker build -t ${imageName}:v1 .`)
                },
                {
                    title: `🐳  Run docker container ${containerName}`,
                    task: () =>
                        execa.shell(`docker run --name ${containerName} -p ${port}:${portBind} -d ${imageName}:v1`)
                }

            ]);
        await environmentTasks.run();
        return { containerName, imageName };
    }
}
