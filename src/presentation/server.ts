import { CronService } from "./cron/cron_service";
import { CheckService } from "../domain/use-cases/checks/check_service";


export class Server {

  public static start() {

    console.log('Server started');
    //TODO: se ejecutara a la media noche
    CronService.ceateCronJob('*/5 * * * * *', () => {
      // const date = new Date();
      // console.log(`five seconds ${date}`);

      new CheckService().execute('https://www.google.com');
    });

  }
}


