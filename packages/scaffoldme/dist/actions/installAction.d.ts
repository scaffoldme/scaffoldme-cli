import { Input } from "../input";
import { AbstractAction } from "./abstractAction";
export declare class InstallAction extends AbstractAction {
    /**
     * @param  {Input[]} inputs
     * @param  {Input[]} options
     */
    handle(inputs: Input[], options: Input[]): Promise<void>;
}
