import httpStatus from 'http-status-codes';
import PipedriveService from './pipedrive.service';

export const webhookPipedrive = async (req, res, next) => {
  try {
    const {
      body: { current },
    } = req;

    const order = await PipedriveService.createOrder(current);

    console.log(order);

    res.status(httpStatus.OK).json({ order });
  } catch (e) {
    next(e);
  }
};
