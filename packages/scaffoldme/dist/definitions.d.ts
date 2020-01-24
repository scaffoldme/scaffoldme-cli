/// <reference types="node" />
import { BaseConfig, CommandInstanceInfo as FrameworkCommandInstanceInfo, CommandLineInputs, CommandLineOptions, CommandMetadata as FrameworkCommandMetadata, CommandMetadataInput, CommandMetadataOption as FrameworkCommandMetadataOption, HydratedCommandMetadata as FrameworkHydratedCommandMetadata, ICommand as FrameworkCommand, INamespace as FrameworkNamespace, Logger, NamespaceLocateResult as FrameworkNamespaceLocateResult, PackageJson, PromptModule } from '@ionic/cli-framework';
import { Subprocess, SubprocessOptions, WhichOptions } from '@ionic/utils-subprocess';
import { ChildProcess, SpawnOptions } from 'child_process';
import { ProjectDetailsResult } from './lib/project';
import { Environment } from './lib/project/environment';
export { CommandLineInputs, CommandLineOptions, CommandMetadataInput, NamespaceMetadata } from '@ionic/cli-framework';
export declare type SuperAgentRequest = import('superagent').SuperAgentRequest;
export interface SuperAgentError extends Error {
    response: import('superagent').Response;
}
export declare type LogFn = (msg: string) => void;
export interface ILogger extends Logger {
    ok: LogFn;
    rawmsg: LogFn;
}
export interface StarterManifest {
    name: string;
    baseref: string;
    welcome?: string;
}
export interface CordovaPackageJson extends PackageJson {
    cordova: {
        platforms: string[];
        plugins: {
            [key: string]: {};
        };
    };
}
export interface Runner<T extends object, U> {
    run(options: T): Promise<U>;
}
export declare type HookName = 'build:before' | 'build:after' | 'serve:before' | 'serve:after';
export interface BaseHookContext {
    project: {
        dir: string;
        srcDir: string;
    };
    argv: string[];
    env: NodeJS.ProcessEnv;
}
export declare type IntegrationName = 'capacitor' | 'cordova' | 'enterprise';
export interface ProjectIntegration {
    enabled?: boolean;
    root?: string;
}
export interface Response<T extends object> extends APIResponseSuccess {
    data: T;
}
export interface ResourceClientLoad<T extends object> {
    load(id: string | number, modifiers: ResourceClientRequestModifiers): Promise<T>;
}
export interface ResourceClientDelete {
    delete(id: string | number): Promise<void>;
}
export interface ResourceClientCreate<T extends object, U extends object> {
    create(details: U): Promise<T>;
}
export interface ResourceClientPaginate<T extends object> {
    paginate(args?: Partial<PaginateArgs<Response<T[]>>>): IPaginator<Response<T[]>, PaginatorState>;
}
export interface ResourceClientRequestModifiers {
    fields?: string[];
}
export interface GithubRepo {
    full_name: string;
    id: number;
}
export interface GithubBranch {
    name: string;
}
export interface AppAssociation {
    repository: RepoAssociation;
}
export interface RepoAssociationBase {
    html_url: string;
    clone_url: string;
    full_name: string;
}
export interface GithubRepoAssociation extends RepoAssociationBase {
    type: 'github';
    id: number;
}
export interface BitbucketCloudRepoAssociation extends RepoAssociationBase {
    type: 'bitbucket_cloud';
    id: string;
}
export interface BitbucketServerRepoAssociation extends RepoAssociationBase {
    type: 'bitbucket_server';
    id: number;
}
export declare type RepoAssociation = GithubRepoAssociation | BitbucketCloudRepoAssociation | BitbucketServerRepoAssociation;
export declare type AssociationType = 'github' | 'bitbucket_cloud' | 'bitbucket_server';
export interface App {
    id: string;
    name: string;
    slug: string;
    repo_url?: string;
    association?: null | AppAssociation;
}
export interface Login {
    user: User;
    token: string;
}
export interface User {
    id: number;
    email: string;
    oauth_identities?: OAuthIdentity;
}
export declare type OAuthIdentity = {
    [A in AssociationType]?: OAuthIdentityDetails;
};
export interface OAuthIdentityDetails {
    username: string;
    name: string;
    html_url: string;
}
export interface Snapshot {
    id: string;
    sha: string;
    ref: string;
    state: string;
    created: string;
    note: string;
}
export interface SSHKey {
    id: string;
    pubkey: string;
    fingerprint: string;
    annotation: string;
    name: string;
    created: string;
    updated: string;
}
export interface SecurityProfile {
    name: string;
    tag: string;
    type: 'development' | 'production';
    created: string;
    credentials: {
        android?: object;
        ios?: object;
    };
}
export interface IConfig extends BaseConfig<ConfigFile> {
    getAPIUrl(): string;
    getDashUrl(): string;
    getGitHost(): string;
    getGitPort(): number;
    getHTTPConfig(): CreateRequestOptions;
}
export interface ProjectPersonalizationDetails {
    name: string;
    projectId: string;
    packageId?: string;
    version?: string;
    description?: string;
}
export interface IProjectConfig {
    name: string;
    id?: string;
    root?: string;
    readonly hooks?: Record<HookName, string | string[] | undefined>;
}
export interface IMultiProjectConfig {
    defaultProject?: string;
    projects: {
        [key: string]: IProjectConfig | undefined;
    };
}
export declare type ProjectFile = IProjectConfig | IMultiProjectConfig;
export interface IProject {
    readonly rootDirectory: string;
    readonly directory: string;
    readonly filePath: string;
    readonly details: ProjectDetailsResult;
    readonly environments: Environment[];
    getInfo(): Promise<InfoItem[]>;
}
export interface PackageVersions {
    [key: string]: string;
}
export interface CommandMetadataOption extends FrameworkCommandMetadataOption {
    private?: boolean;
    hint?: string;
}
export interface ExitCodeException extends Error {
    exitCode: number;
}
export interface CommandMetadata extends FrameworkCommandMetadata<CommandMetadataInput, CommandMetadataOption> {
    type: 'global' | 'project';
}
export declare type HydratedCommandMetadata = CommandMetadata & FrameworkHydratedCommandMetadata<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption>;
export declare type CommandInstanceInfo = FrameworkCommandInstanceInfo<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption>;
export declare type NamespaceLocateResult = FrameworkNamespaceLocateResult<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption>;
export interface ISession {
    login(email: string, password: string): Promise<void>;
    ssoLogin(email: string): Promise<void>;
    tokenLogin(token: string): Promise<void>;
    logout(): Promise<void>;
    isLoggedIn(): boolean;
    getUser(): {
        id: number;
    };
    getUserToken(): string;
}
export interface IShellSpawnOptions extends SpawnOptions {
    showCommand?: boolean;
}
export interface IShellOutputOptions extends IShellSpawnOptions {
    fatalOnError?: boolean;
    fatalOnNotFound?: boolean;
    showError?: boolean;
}
export interface IShellRunOptions extends IShellOutputOptions {
    stream?: NodeJS.WritableStream;
    killOnExit?: boolean;
    truncateErrorOutput?: number;
}
export interface IShell {
    alterPath: (path: string) => string;
    run(command: string, args: readonly string[], options: IShellRunOptions): Promise<void>;
    output(command: string, args: readonly string[], options: IShellOutputOptions): Promise<string>;
    spawn(command: string, args: readonly string[], options: IShellSpawnOptions): Promise<ChildProcess>;
    cmdinfo(cmd: string, args?: readonly string[], options?: SubprocessOptions): Promise<string | undefined>;
    which(command: string, options?: WhichOptions): Promise<string>;
    createSubprocess(command: string, args: readonly string[], options?: SubprocessOptions): Promise<Subprocess>;
}
export interface ITelemetry {
    sendCommand(command: string, args: string[]): Promise<void>;
}
export declare type NpmClient = 'yarn' | 'npm';
export declare type FeatureId = 'ssl-commands';
export interface ConfigFile {
    'version': string;
    'telemetry': boolean;
    'npmClient': NpmClient;
    'interactive'?: boolean;
    'proxy'?: string;
    'ssl.cafile'?: string | string[];
    'ssl.certfile'?: string | string[];
    'ssl.keyfile'?: string | string[];
    'urls.api'?: string;
    'urls.dash'?: string;
    'git.host'?: string;
    'git.port'?: number;
    'git.setup'?: boolean;
    'org.id'?: string;
    'user.id'?: number;
    'user.email'?: string;
    'tokens.user'?: string;
    'tokens.telemetry'?: string;
    'features.ssl-commands'?: boolean;
}
export interface SSLConfig {
    cafile?: string | string[];
    certfile?: string | string[];
    keyfile?: string | string[];
}
export interface CreateRequestOptions {
    ssl?: SSLConfig;
    proxy?: string;
}
export declare type APIResponse = APIResponseSuccess | APIResponseError;
export interface APIResponseMeta {
    status: number;
    version: string;
    request_id: string;
}
export declare type APIResponseData = object | object[] | string;
export interface APIResponseErrorDetails {
    error_type: string;
    parameter: string;
    errors: string[];
}
export interface APIResponseError {
    error: APIResponseErrorError;
    meta: APIResponseMeta;
}
export interface APIResponseErrorError {
    message: string;
    link: string | null;
    type: string;
    details?: APIResponseErrorDetails[];
}
export interface APIResponseSuccess {
    data: APIResponseData;
    meta: APIResponseMeta;
}
export interface APIResponsePageTokenMeta extends APIResponseMeta {
    prev_page_token?: string;
    next_page_token?: string;
}
export declare type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'PURGE' | 'HEAD' | 'OPTIONS';
export interface IClient {
    config: IConfig;
    make(method: HttpMethod, path: string): Promise<{
        req: SuperAgentRequest;
    }>;
    do(req: SuperAgentRequest): Promise<APIResponseSuccess>;
    paginate<T extends Response<object[]>>(args: PaginateArgs<T>): IPaginator<T>;
}
export declare type PaginateArgs<T extends Response<object[]>> = Pick<PaginatorDeps<T>, 'reqgen' | 'guard' | 'state' | 'max'>;
export interface IPaginator<T extends Response<object[]>, S = PaginatorState> extends IterableIterator<Promise<T>> {
    readonly state: S;
}
export declare type PaginatorRequestGenerator = () => Promise<{
    req: SuperAgentRequest;
}>;
export declare type PaginatorGuard<T extends Response<object[]>> = (res: APIResponseSuccess) => res is T;
export interface PaginatorState {
    done: boolean;
    loaded: number;
}
export interface PagePaginatorState extends PaginatorState {
    page: number;
    page_size?: number;
}
export interface TokenPaginatorState extends PaginatorState {
    page_token?: string;
}
export interface PaginatorDeps<T extends Response<object[]>, S = PaginatorState> {
    readonly client: IClient;
    readonly reqgen: PaginatorRequestGenerator;
    readonly guard: PaginatorGuard<T>;
    readonly state?: Partial<S>;
    readonly max?: number;
}
export declare type InfoItemGroup = 'scaffoldme' | 'utility' | 'system' | 'environment';
export interface InfoItem {
    group: InfoItemGroup;
    key: string;
    value: string;
    flair?: string;
    path?: string;
}
export interface BaseBuildOptions {
    engine: string;
    platform?: string;
    project?: string;
    '--': string[];
}
export interface ScaffoldmeContext {
    readonly binPath: string;
    readonly libPath: string;
    readonly execPath: string;
    readonly version: string;
}
export interface ScaffoldmeEnvironment {
    readonly flags: ScaffoldmeEnvironmentFlags;
    readonly client: IClient;
    readonly config: IConfig;
    readonly log: ILogger;
    readonly prompt: PromptModule;
    readonly ctx: ScaffoldmeContext;
    readonly session: ISession;
    readonly shell: IShell;
    getInfo(): Promise<InfoItem[]>;
}
export interface ScaffoldmeEnvironmentFlags {
    readonly interactive: boolean;
    readonly confirm: boolean;
}
export declare type DistTag = 'testing' | 'canary' | 'latest';
export interface ICommand extends FrameworkCommand<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption> {
    readonly deps: ScaffoldmeEnvironment;
    readonly project: IProject;
    execute(inputs: CommandLineInputs, options: CommandLineOptions, metadata: CommandInstanceInfo): Promise<void>;
}
export interface CommandPreRun extends ICommand {
    preRun(inputs: CommandLineInputs, options: CommandLineOptions, metadata: CommandInstanceInfo): Promise<void>;
}
export interface INamespace extends FrameworkNamespace<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption> {
    env: ScaffoldmeEnvironment;
    project: IProject;
}
export interface IPCMessage {
    type: 'telemetry';
    data: {
        command: string;
        args: string[];
    };
}
export declare type EnvironmentType = 'frontEnd' | 'api' | 'service' | 'mobile' | 'dataBase';
export interface IEnvironment {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly environmentType: EnvironmentType;
    readonly framework: ITechnologyProject;
    readonly style: ITechnologyProject;
    readonly typing: ITechnologyProject;
    readonly modules: ITechnologyProject[];
}
export interface IVersion {
    readonly version: string;
    readonly publicationDate: Date;
}
export declare type TechnologyType = 'framework' | 'style' | 'typing' | 'module';
export declare type TechnologyName = 'react' | 'angular' | 'vueJs' | 'express' | 'loopback';
export interface ITechnologyProject {
    readonly name: TechnologyName;
    readonly selectedVersion: IVersion;
    readonly technologyType: TechnologyType;
}
export interface IConfigScaffoldme {
    id: string;
    name: string;
    description: string;
    logo: string;
    environments: IEnvironment[];
}
export interface IDockerContainer {
    name: string;
    imageName: string;
}
