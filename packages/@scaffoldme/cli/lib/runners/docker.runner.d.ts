export declare class DockerRunner {
    constructor();
    startContainer(container_name: string): Promise<void>;
    stopContainer(container_name: string): Promise<void>;
}
