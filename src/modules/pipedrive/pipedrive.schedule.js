import { Schedules } from '../../core/schedules/schedule';
import managerMultipleRequest from '../../core/utils/manage-multiple-request';
import pipedriveClient from '../../core/clients-http/pipedrive.client';
import pipedriveService from './pipedrive.service';
import { ParserJson } from './helpers/parser-json';
import { PipedriveNotifier } from './pipedrive.notifier';
import orderService from '../order/order.service';

export class PipedriveSchedule extends Schedules {
  constructor() {
    super();
    this.cron = `*/10 * * * *`;
    this.messageSchedulle = "Scheduller work to collect pipedrive orders'";
  }

  start() {
    this.createJob(this.cron, this.messageSchedulle);
  }

  async dataCollector() {
    try {
      const { deals } = await pipedriveClient.getDeals();

      const extractOrderlimiter = managerMultipleRequest.requestLimiter(
        5,
        100,
        pipedriveService.extractOrder
      );

      const orders = await Promise.all(
        deals.map(deal => managerMultipleRequest.promiseHandler(extractOrderlimiter(deal)))
      );

      const ordersMaped = orders
        .filter(({ success }) => success)
        .map(({ _, result: { orderBling, orderMongo } }) => {
          return { orderBling: new ParserJson().convertToXml(orderBling), orderMongo };
        });

      ordersMaped.forEach(({ orderBling, orderMongo }) => {
        new PipedriveNotifier(orderBling)
          .notifyOrderToBling()
          .then(() => orderService.registeOrder(orderMongo))
          .then(() => {
            console.log('ORDER SENDED SUCCESSFULLY');
          })
          .catch(error => console.log(error.message));
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
