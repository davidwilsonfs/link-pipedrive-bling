const CronJob = require('cron').CronJob;

const startJobCron = () => {
  new CronJob(
    `*/1 * * * *`, // A cada 1 minuto
    async () => {
      console.log('Scheduller work to collect pipedrive orders');
    },
    null,
    true
  );
};

export { startJobCron };
