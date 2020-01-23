import { Project } from "@scaffoldme/core";
import { loadScaffoldmeJson } from "..";
import { Input } from "../input";

export abstract class AbstractAction {
  public _project?: Project;

  constructor() {
    setTimeout(() => {
      this.getProject();
    }, 3000);
  }

  public abstract async handle(
    inputs?: Input[],
    options?: Input[],
    extraFlags?: string[]
  ): Promise<void>;

  private async getProject() {
    try {
      await console.log("bi");

      this._project = await loadScaffoldmeJson();
    } catch (error) {
      console.log(error);
    }
  }

  get project() {
    return this._project;
  }
}
