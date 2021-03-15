import { Order } from './pipedrive.model';

export const register = async data => {
  try {
    const order = new Order(data);
    return order.save();
  } catch (e) {
    throw e;
  }
};

export const getById = async id => {
  try {
    return Order.findOne({ order_id: id });
  } catch (e) {
    throw e;
  }
};

export const update = async (id, data) => {
  try {
    const order = await Order.findById({ _id: id });
    return await order.update(data);
  } catch (e) {
    throw e;
  }
};

export const agregateOpportunities = async (query = {}) => {
  try {
    const aggregate = Order.aggregate()
      .group({
        _id: {
          year: { $year: '$created_at' },
          month: { $month: '$created_at' },
          day: { $dayOfMonth: '$created_at' },
        },
        all_values: { $push: '$value' },
        all_products: { $push: '$products_count' },
      })
      .project({
        date: {
          $concat: [
            { $toString: '$_id.day' },
            '-',
            { $toString: '$_id.month' },
            '-',
            { $toString: '$_id.year' },
          ],
        },
        total_won: { $sum: '$all_values' },
        total_products: { $sum: '$all_products' },
      })
      .sort({ '_id.year': 1, '_id.month': 1, '_id.day': 1 });

    
    return aggregate;
  } catch (e) {
    throw e;
  }
};
