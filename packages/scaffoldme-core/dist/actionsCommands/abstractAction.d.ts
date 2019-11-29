import { Input } from '@scaffoldme-cli/scaffoldme';
export declare abstract class AbstractAction {
    abstract handle(inputs?: Input[], options?: Input[], extraFlags?: string[]): Promise<void>;
}
