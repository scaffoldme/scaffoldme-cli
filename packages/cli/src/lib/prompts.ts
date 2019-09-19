import { PromptQuestion, PromptValue } from '@ionic/cli-framework';
import { ILogger, ScaffoldmeEnvironmentFlags } from '../definitions';
import { ancillary, input, weak } from './color';



export interface CreateOnFallbackOptions {
  readonly flags: ScaffoldmeEnvironmentFlags;
  readonly log: ILogger;
}

export function createOnFallback({ flags: { confirm }, log }: CreateOnFallbackOptions) {
  return (question: PromptQuestion): PromptValue | void => {
    if (question.type === 'confirm') {
      if (confirm) {
        log.msg(`${input('--confirm')}: ${weak(question.message)} ${ancillary('Yes')}`);
        return true;
      } else {
        log.msg(`${input('--no-confirm')}: ${weak(question.message)} ${ancillary('No')}`);
        return false;
      }
    }
  };
}
