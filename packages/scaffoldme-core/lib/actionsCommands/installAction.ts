import { AbstractAction } from './abstractAction';
import { Input } from '@scaffoldme-cli/scaffoldme';

export class InstallAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    console.log('input ----', inputs);
    console.log('options -----', options);
    
    process.exit(0);
  }
}