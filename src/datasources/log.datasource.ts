import { LogEntities, LogEntitiesLevel } from "../domain/entities/log.entities";


export abstract class LogDataSource {
    abstract saveLog(log: LogEntities): Promise<void>;
    abstract getLogs(severrityLevel: LogEntitiesLevel): Promise<LogEntities[]>;
}