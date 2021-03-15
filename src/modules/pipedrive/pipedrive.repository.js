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
