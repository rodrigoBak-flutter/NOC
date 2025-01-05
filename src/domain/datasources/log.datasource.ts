import { LogEntity, LogSeverityLevel } from "../entities/log.entities";



export abstract class LogDataSource {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severrityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}