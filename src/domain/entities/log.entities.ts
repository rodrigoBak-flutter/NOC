
export enum LogSeverityLevel {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}


export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor(message: string, level: LogSeverityLevel) {
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
    }

    static fromJson(json: string): LogEntity {
        const { message, level, createdAt } = JSON.parse(json);
        if (!message || !level || !createdAt) {
            throw new Error('Invalid JSON');
        }
        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt);

        return log;
    }
}