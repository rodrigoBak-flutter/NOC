import { CronService } from "./cron/cron_service";


export class Server{

   public static start(){

        console.log('Server started');
        //TODO: se ejecutara a la media noche
        CronService.ceateCronJob('00 00 00 * * *', () => {
            const date = new Date();
          //  console.log('five seconds', date);
        });
        
    }
}


