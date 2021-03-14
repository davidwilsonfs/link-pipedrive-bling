import httpStatus from 'http-status-codes';
import PipedriveService from './pipedrive.service';
import { AdapterJson } from './adpter-json';

export const webhookPipedrive = async (req, res, next) => {
  try {
    const {
      body: { current },
    } = req;

    const order = await PipedriveService.createOrder(current);
    const orderXml = new AdapterJson().convertToXml(order);

    console.log('aqquiii');
    console.log(orderXml);

    res.status(httpStatus.OK).json({ order });
  } catch (e) {
    next(e);
  }
};
