import { PromptQuestion } from '@ionic/cli-framework';
import { ILogger, ScaffoldmeEnvironmentFlags } from '../definitions';
export interface CreateOnFallbackOptions {
    readonly flags: ScaffoldmeEnvironmentFlags;
    readonly log: ILogger;
}
export declare function createOnFallback({ flags: { confirm }, log }: CreateOnFallbackOptions): (question: PromptQuestion) => string | boolean | void | import("@ionic/cli-framework").PromptValueCheckbox;
