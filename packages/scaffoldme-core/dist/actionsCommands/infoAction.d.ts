import { AbstractAction } from './abstractAction';
export declare class InfoAction extends AbstractAction {
    handle(): Promise<void>;
}
export declare const displayNScaffoldmeInformation: () => Promise<void>;
