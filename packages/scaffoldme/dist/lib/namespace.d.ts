import { BaseCommandMap, BaseNamespace, BaseNamespaceMap } from '@ionic/cli-framework';
import { CommandMetadata, CommandMetadataInput, CommandMetadataOption, ICommand, INamespace, IProject, ScaffoldmeEnvironment } from '../definitions';
export declare class CommandMap extends BaseCommandMap<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption> {
}
export declare class NamespaceMap extends BaseNamespaceMap<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption> {
}
export declare abstract class Namespace extends BaseNamespace<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption> implements INamespace {
    parent: INamespace | undefined;
    constructor(parent: INamespace | undefined);
    get env(): ScaffoldmeEnvironment;
    get project(): IProject;
}
