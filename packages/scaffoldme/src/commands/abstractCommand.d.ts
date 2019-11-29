import { CommanderStatic } from 'commander';
import { AbstractAction } from '@scaffoldme-cli/scaffoldme-core';
export declare abstract class AbstractCommand {
    protected action: AbstractAction;
    constructor(action: AbstractAction);
    abstract load(program: CommanderStatic): void;
}
