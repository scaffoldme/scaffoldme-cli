import { ScaffoldmeContext } from './definitions';
import { Executor } from './lib/executor';
export * from './constants';
export * from './definitions';
export * from './guards';
export declare function generateContext(): Promise<ScaffoldmeContext>;
export declare function loadExecutor(ctx: ScaffoldmeContext, pargv: string[]): Promise<Executor>;
export declare function run(pargv: string[]): Promise<void>;
