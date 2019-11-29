import { AbstractAction } from './abstractAction';
import { Input } from '@scaffoldme-cli/scaffoldme';
export declare class InstallAction extends AbstractAction {
    handle(inputs: Input[], options: Input[]): Promise<void>;
}
