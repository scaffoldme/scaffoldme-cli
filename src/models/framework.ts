import * as execa from 'execa';
import * as Listr from 'listr';
import { ITechnology, TechnologyName, TechnologyType } from '../definition';
import { Technology } from './technology';

export abstract class Framework extends Technology {
    public port: number;

    constructor(name: TechnologyName, type: TechnologyType, port: number) {
        super(name, type);
        this.port = port;
    }

    /**
     * Clone framework from github
     * @param {ITechnology} framework framework information
     * @param {string} folderName Name of the folder that will contain the framework
     */
    public static async install(framework: ITechnology, folderName: string) {
        const tasks = new Listr([
            {
                title: `🔧  Installation Framework`,
                task: async () =>
                    execa('git', ['clone', `https://github.com/scaffoldme/${framework.name}-starter.git`, folderName])
            }
        ]);
        tasks.run();
    }
}
