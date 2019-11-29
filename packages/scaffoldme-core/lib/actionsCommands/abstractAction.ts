import { Input } from '@scaffoldme-cli/scaffoldme';

export abstract class AbstractAction {
  public abstract async handle(
    inputs?: Input[],
    options?: Input[],
    extraFlags?: string[],
  ): Promise<void>;
}