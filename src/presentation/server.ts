import { CronService } from "./cron/cron_service";
import { CheckService } from "../domain/use-cases/checks/check_service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasource/file-system.datasource";



const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource(),
);

export class Server {

  public static start() {

    console.log('Server started');
    //TODO: se ejecutara a la media noche
    CronService.ceateCronJob('*/5 * * * * *', () => {
      // const date = new Date();
      // console.log(`five seconds ${date}`);
      //const url = 'https://www.google.com';
      const url = 'http://localhost:3001/posts';
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`Service ${url} is ok`),
        (error) => console.error(`Error: ${error}`),

      ).execute(`${url}`);
       
    });
  }
}


