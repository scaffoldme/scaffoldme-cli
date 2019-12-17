import { AbstractAction, Input } from '@scaffoldme/core';
export declare class InstallAction extends AbstractAction {
    /**
     * @param  {Input[]} inputs
     * @param  {Input[]} options
     */
    handle(inputs: Input[], options: Input[]): Promise<void>;
}
