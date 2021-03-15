import httpStatus from 'http-status-codes';
import { AdapterJson } from './helpers/adpter-json';
import { NotifyOrder } from './notify-order';
import PipedriveService from './pipedrive.service';

class PipedriveWebhooks {
  dealsEventHandler = async (req, res, next) => {
    try {
      const {
        body: { current },
      } = req;

      const { orderBling, orderStore } = await PipedriveService.createOrder(current);
      const orderXml = new AdapterJson().convertToXml(orderBling);

      new NotifyOrder(orderXml, orderStore).notifyToBling();

      res.status(httpStatus.OK).json({ orderStore });
    } catch (e) {
      next(e);
    }
  };
}

export default new PipedriveWebhooks();
