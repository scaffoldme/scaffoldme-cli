import chalk from 'chalk';
import * as fs from 'fs';
import { fileName } from '../constant';
import { IEnvironment, IProject } from '../definition';

export class Project {
    private data: IProject;

    constructor() {
        this.data = {};
    }

    public load(): void {
        if (!fs.existsSync(fileName)) {
            console.log(chalk.red(`The file ${fileName} was not found in the current folder`));
            return;
        }
        this.data = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    }

    public getProjectName(): string {
        if (this.data && this.data.name) {
            return this.data.name;
        } else {
            return 'Scafoldme Project';
        }
    }

    public getEnvironments(): IEnvironment[] {
        return this.data.environments || [];
    }
}