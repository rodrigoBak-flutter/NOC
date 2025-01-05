
interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}



export class CheckService implements CheckServiceUseCase {
    public async execute(url: string): Promise<boolean> {

        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`Error on check service ${url}`);
            }
          //  console.log(`Check service ${url} is ok`);
            return true;
        } catch (error) {

            console.error(`${error}`);

            return false;
        }

    }
}