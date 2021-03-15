import { CronJob } from 'cron';

export class Schedules {
  constructor() {
    this.instanceCronJob = CronJob;
  }

  createJob(cron, message) {
    new this.instanceCronJob(
      cron,
      async () => {
        console.log(message);
        this.dataCollector();
      },
      null,
      true
    );
  }
}
