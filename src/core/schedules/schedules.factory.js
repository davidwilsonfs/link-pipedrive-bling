import { PipedriveSchedule } from '../../modules/pipedrive/pipedrive.schedule';

class SchedulesFactory {
  constructor() {}

  startSchedules() {
    new PipedriveSchedule().start();
  }
}

export { SchedulesFactory };
