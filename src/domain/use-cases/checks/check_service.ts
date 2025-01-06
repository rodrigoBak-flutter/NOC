import { LogEntity, LogSeverityLevel } from "../../entities/log.entities";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRespository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }

    public async execute(url: string): Promise<boolean> {

        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.LOW);
            this.logRespository.saveLog(log);
            this.successCallback();
            // console.log(`Check service ${url} is ok`);
            return true;
        } catch (error) {
            // console.error(`${error}`);
            const errorMessage = `url:${url}  ${error}`;
            const log = new LogEntity(errorMessage, LogSeverityLevel.HIGH);
            this.logRespository.saveLog(log);
            this.errorCallback(errorMessage);
            return false;
        }

    }
}