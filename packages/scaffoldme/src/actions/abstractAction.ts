import { Input } from "../input";

export abstract class AbstractAction {
  constructor() {}

  public abstract async handle(
    inputs?: Input[],
    options?: Input[],
    extraFlags?: string[]
  ): Promise<void>;
}
