import { CommanderStatic } from 'commander';
import { AbstractAction } from '@scaffoldme/core';

export abstract class AbstractCommand {
  constructor(protected action: AbstractAction) {}

  /**
   * function to load all process command
   * @param  {CommanderStatic} program
   * @returns void
   */
  public abstract load(program: CommanderStatic): void;
}