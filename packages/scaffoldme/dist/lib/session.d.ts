import { IClient, IConfig, ISession, ScaffoldmeEnvironment } from '../definitions';
export interface SessionDeps {
    readonly config: IConfig;
    readonly client: IClient;
}
export declare class BaseSession {
    readonly e: SessionDeps;
    constructor(e: SessionDeps);
    logout(): Promise<void>;
    isLoggedIn(): boolean;
    getUser(): {
        id: number;
    };
    getUserToken(): string;
}
export declare class ProSession extends BaseSession implements ISession {
    login(email: string, password: string): Promise<void>;
    ssoLogin(email: string): Promise<void>;
    tokenLogin(token: string): Promise<void>;
}
export declare function promptToLogin(env: ScaffoldmeEnvironment): Promise<void>;
