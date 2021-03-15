import { Order } from './pipedrive.model';

export const register = async data => {
  try {
    const order = new Order(data);
    return order.save();
  } catch (e) {
    throw e;
  }
};
