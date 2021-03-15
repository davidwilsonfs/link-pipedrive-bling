import { PipedriveSchedule } from './pipedrive.schedule';

class SchedulesFactory {
  constructor() {}

  startSchedules() {
    new PipedriveSchedule().start();
  }
}

export { SchedulesFactory };
