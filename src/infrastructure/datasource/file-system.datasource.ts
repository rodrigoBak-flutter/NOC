import fs from 'fs';
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entities";


export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsFile();
    }
    private createLogsFile = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach((path) => {
            if (!fs.existsSync(path)) return;
            fs.writeFileSync(path, '');
        });
    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJSON = `${JSON.stringify(newLog)}\n`;

        //TODO: Con esta linea de codigo se guarda el log como un JSON
        fs.appendFileSync(this.allLogsPath, logAsJSON);

        if (newLog.level === LogSeverityLevel.LOW) return;

        if (newLog.level === LogSeverityLevel.MEDIUM) {
            fs.appendFileSync(this.mediumLogsPath, logAsJSON);
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJSON);
        }
    }

    private async getLogsFromFile(path: string): Promise<LogEntity[]>  {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').filter((log) => log !== '').map(
            log => LogEntity.fromJson(log));
        return logs;

    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.LOW:
                return this.getLogsFromFile(this.allLogsPath);

            case LogSeverityLevel.MEDIUM:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverityLevel.HIGH:
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error(` ${severityLevel} not implemented`);
        }
    }


}