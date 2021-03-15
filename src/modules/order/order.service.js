import * as repository from './order.repository';

class OrderService {
  async registeOrder(order) {
    try {
      await repository.register(order);
    } catch (error) {
      throw error;
    }
  }
  async getByOrderId(order) {
    try {
      const { _id, ...restOfData } = await repository.getByOrderId(order);
      return { ...restOfData, ..._id };
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      await repository.update(id, data);
    } catch (error) {
      throw error;
    }
  }

  async getOpportunities() {
    try {
      const [{ _id, ...restOfData }] = await repository.agregateOpportunities();

      return { ...restOfData, ..._id };
    } catch (error) {
      throw error;
    }
  }
}

export default new OrderService();
