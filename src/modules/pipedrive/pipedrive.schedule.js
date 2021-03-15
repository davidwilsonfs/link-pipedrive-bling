import { Schedules } from '../../core/schedules/schedule';
import { requestLimiter, promiseHandler } from '../../core/utils/utils';
import pipedriveClient from '../../core/clients-http/pipedrive.client';
import pipedriveService from './pipedrive.service';
import { AdapterJson } from './helpers/parser-json';
import { NotifyOrder } from './pipedrive.notifier';

export class PipedriveSchedule extends Schedules {
  constructor() {
    super();
    this.cron = `*/10 * * * * *`;
    this.messageSchedulle = "Scheduller work to collect pipedrive orders'";
  }

  start() {
    this.createJob(this.cron, this.messageSchedulle);
  }

  async dataCollector() {
    try {
      const { deals } = await pipedriveClient.getDeals();

      const createOrderlimiter = requestLimiter(5, 100, pipedriveService.createOrder);

      const dealsPopulated = await Promise.all(
        deals.map(deal => promiseHandler(createOrderlimiter(deal)))
      );

      const ordersXml = dealsPopulated
        .filter(({ success }) => success)
        .map(({ _, result: { orderBling, orderStore } }) => {
          return { orderBling: new AdapterJson().convertToXml(orderBling), orderStore };
        });

      ordersXml.forEach(({ orderBling, orderStore }) =>
        new NotifyOrder(orderBling, orderStore).notifyToBling()
      );
    } catch (error) {
      console.log(error);
    }
  }
}
