
interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }

    public async execute(url: string): Promise<boolean> {

        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            this.successCallback();
            // console.log(`Check service ${url} is ok`);
            return true;
        } catch (error) {

            // console.error(`${error}`);
            this.errorCallback(`${error}`);
            return false;
        }

    }
}