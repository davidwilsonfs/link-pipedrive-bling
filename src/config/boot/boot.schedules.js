import { SchedulesFactory } from '../../core/schedules/schedules.factory';

async function startSchedules() {
  try {
    new SchedulesFactory().startSchedules();
  } catch (error) {
    console.log(error);
  }
}

export { startSchedules };
