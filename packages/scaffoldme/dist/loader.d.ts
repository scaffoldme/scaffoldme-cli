import { CommanderStatic } from 'commander';
export declare class Loader {
    static load(program: CommanderStatic): void;
    /**
     * check inalid command and return error
     * @param  {CommanderStatic} program
     */
    private static handleInvalidCommand;
}
