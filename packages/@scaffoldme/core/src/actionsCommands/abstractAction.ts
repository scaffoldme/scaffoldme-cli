import { Input } from './input'
export abstract class AbstractAction {
  public abstract async handle(
    inputs?: Input[],
    options?: Input[],
    extraFlags?: string[],
  ): Promise<void>;
}