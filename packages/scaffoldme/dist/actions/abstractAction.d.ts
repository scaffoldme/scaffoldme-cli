import { Project } from "@scaffoldme/core";
import { Input } from "../input";
export declare abstract class AbstractAction {
    _project?: Project;
    constructor();
    abstract handle(inputs?: Input[], options?: Input[], extraFlags?: string[]): Promise<void>;
    private getProject;
    get project(): Project | undefined;
}
