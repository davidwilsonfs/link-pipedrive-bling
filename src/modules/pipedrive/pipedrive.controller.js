import httpStatus from 'http-status-codes';
import PipedriveService from './pipedrive.service';
import { AdapterJson } from './adpter-json';
import { NotifyOrder } from './notify-order';

export const webhookPipedrive = async (req, res, next) => {
  try {
    const {
      body: { current },
    } = req;

    const { orderBling, orderStore, isUpdate } = await PipedriveService.createOrder(current);
    const orderXml = new AdapterJson().convertToXml(orderBling);

    new NotifyOrder(orderXml, orderStore, isUpdate).notifyToBling();

    res.status(httpStatus.OK).json({ order });
  } catch (e) {
    next(e);
  }
};
