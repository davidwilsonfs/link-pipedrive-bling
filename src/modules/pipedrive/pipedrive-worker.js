import { CronJob } from 'cron';
import { dataCollector } from './pipedrive.datalayer';

const startJobCron = () => {
  new CronJob(
    `*/40 * * * * *`, // A cada 1 minuto
    async () => {
      console.log('Scheduller work to collect pipedrive orders');
      dataCollector();
    },
    null,
    true
  );
};

export { startJobCron };
