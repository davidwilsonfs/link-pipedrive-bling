import httpStatus from 'http-status-codes';
import PipedriveService from './pipedrive.service';
import { AdapterJson } from './adpter-json';
import { NotifyOrder } from './notify-order';

export const webhookPipedrive = async (req, res, next) => {
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

export const getOpportunities = async (req, res, next) => {
  try {
    const opportunities = await PipedriveService.getOpportunities();

    console.log(opportunities);
    res.status(httpStatus.OK).json({ opportunities });
  } catch (e) {
    next(e);
  }
};
