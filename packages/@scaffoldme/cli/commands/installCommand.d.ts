import { CommanderStatic } from "commander";
import { AbstractCommand } from "./abstractCommand";
export declare class InstallCommand extends AbstractCommand {
    /**
     * load install command
     * @param  {CommanderStatic} program
     */
    load(program: CommanderStatic): void;
}
