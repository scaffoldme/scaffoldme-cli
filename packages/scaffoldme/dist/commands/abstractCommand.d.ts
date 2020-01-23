import { CommanderStatic } from "commander";
import { AbstractAction } from "../actions/abstractAction";
export declare abstract class AbstractCommand {
    protected action: AbstractAction;
    constructor(action: AbstractAction);
    /**
     * function to load all process command
     * @param  {CommanderStatic} program
     * @returns void
     */
    abstract load(program: CommanderStatic): void;
}
