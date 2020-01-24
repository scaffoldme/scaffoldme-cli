import { CreateTaggedFormatterOptions, Logger as BaseLogger, LoggerFormatter } from '@ionic/cli-framework';
import { ILogger } from '../../definitions';
export declare class Logger extends BaseLogger implements ILogger {
    ok(msg: string): void;
    rawmsg(msg: string): void;
}
export declare function createFormatter(options?: CreateTaggedFormatterOptions): LoggerFormatter;
export declare function createDefaultLoggerHandlers(formatter?: LoggerFormatter): Set<any>;
