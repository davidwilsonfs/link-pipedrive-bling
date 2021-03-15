import httpStatus from 'http-status-codes';
import orderService from './order.service';

class OrderController {
  getOpportunities = async (req, res, next) => {
    try {
      const opportunities = await orderService.getOpportunities();

      res.status(httpStatus.OK).json({ opportunities });
    } catch (e) {
      next(e);
    }
  };
}

export default new OrderController();
