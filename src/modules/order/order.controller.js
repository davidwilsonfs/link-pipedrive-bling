import httpStatus from 'http-status-codes';
import orderService from './order.service';

class OrderController {
  getAll = async (req, res, next) => {
    try {
      const MAX_INT = 1000000;

      let { limit, page } = req.query;
      limit = limit || MAX_INT;
      page = page || 1;

      const options = { limit, page };

      const { data, metadata } = await orderService.getAllOrders(options);

      res.status(httpStatus.OK).json({ data, metadata });
    } catch (e) {
      next(e);
    }
  };

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
