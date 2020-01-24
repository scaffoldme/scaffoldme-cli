export interface OpenOptions {
    app?: string | readonly string[];
}
export declare function open(target: string, options?: OpenOptions): Promise<void>;
