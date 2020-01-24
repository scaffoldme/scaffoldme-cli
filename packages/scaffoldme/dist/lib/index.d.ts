import { IProject, ScaffoldmeContext, ScaffoldmeEnvironment } from '../definitions';
export declare function generateScaffoldmeEnvironment(ctx: ScaffoldmeContext, pargv: string[]): Promise<{
    env: ScaffoldmeEnvironment;
    project: IProject;
}>;
