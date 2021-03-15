import orderRepository from './order.repository';

class OrderService {
  async registeOrder(order) {
    try {
      await orderRepository.register(order);
    } catch (error) {
      throw error;
    }
  }

  async getByOrderId(order) {
    try {
      const { _id, ...restOfData } = await orderRepository.getByOrderId(order);
      return { ...restOfData, ..._id };
    } catch (error) {
      throw error;
    }
  }

  getAllOrders() {}

  async getOpportunities() {
    try {
      const [{ _id, ...restOfData }] = await orderRepository.agregateOpportunities();

      return { ...restOfData, ..._id };
    } catch (error) {
      throw error;
    }
  }
}

export default new OrderService();
