import httpStatus from 'http-status-codes';
import orderService from '../order/order.service';
import { ParserJson } from './helpers/parser-json';
import { PipedriveNotifier } from './pipedrive.notifier';
import PipedriveService from './pipedrive.service';

class PipedriveWebhooks {
  dealsEventHandler = async (req, res, next) => {
    try {
      const {
        body: { current },
      } = req;

      const { orderBling, orderMongo } = await PipedriveService.extractOrder(current);

      const orderXml = new ParserJson().convertToXml(orderBling);

      await new PipedriveNotifier(orderXml).notifyToBling();

      await orderService.registeOrder(orderMongo);

      res.status(httpStatus.OK).json({ order: orderMongo });
    } catch (e) {
      next(e);
    }
  };
}

export default new PipedriveWebhooks();
