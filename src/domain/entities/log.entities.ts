
export enum LogEntitiesLevel {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}


export class LogEntities {
    public level: LogEntitiesLevel;
    public message: string;
    public createdAt: Date;

    constructor(message: string, level: LogEntitiesLevel) {
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
    }
}