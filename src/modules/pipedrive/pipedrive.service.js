import { OrderBuilder } from './helpers/order.builder';
import * as exception from './pipedrive.exceptions';
import { STAGE_WON } from './pipedrive.constants';
import { orderMount } from './helpers/order-mount';
import pipedriveClient from '../../core/clients-http/pipedrive.client';
import orderRepository from '../order/order.repository';

class PipedriveService {
  async createOrder(data) {
    try {
      const existData = await orderRepository.getById(data.id);

      if (data.status !== STAGE_WON || existData) {
        exception.stageNotReached();
      }

      const { data: dealDetails } = await pipedriveClient.getDealDetails(data.id);
      const { products } = await pipedriveClient.getDealProducts(data.id);

      const payload = {
        products,
        deal_details: dealDetails,
      };

      const builder = new OrderBuilder(payload);

      builder.buildOrder();
      builder.buildClient();
      builder.buildItens();

      return {
        orderBling: builder.order,
        orderStore: orderMount(payload),
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new PipedriveService();
