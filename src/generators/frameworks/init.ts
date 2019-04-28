import * as program from 'commander';

export class InitFramework {
  public commands(): void {
    program
      .command('init')
      .alias('i')
      .description('Initialization of the project')
      .action(() => console.log('init ok'));
  }
}
