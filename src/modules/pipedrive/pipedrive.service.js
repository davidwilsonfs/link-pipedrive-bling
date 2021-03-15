import * as exception from './pipedrive.exceptions';
import { STAGE_WON } from './pipedrive.constants';
import { orderMount } from './helpers/order-mongo.builder';
import pipedriveClient from '../../core/clients-http/pipedrive.client';
import orderRepository from '../order/order.repository';
import { OrderBlingBuilder } from './helpers/order-bling.builder';

class PipedriveService {
  async extractOrder(data) {
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

      const orderBuilderBling = new OrderBlingBuilder(payload);

      orderBuilderBling.buildOrder();
      orderBuilderBling.buildClient();
      orderBuilderBling.buildItens();

      const orderBuilderMongo = new OrderBlingBuilder(payload);

      orderBuilderMongo.buildOrder();

      return {
        orderBling: orderBuilderBling.order,
        orderMongo: orderBuilderMongo.order,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new PipedriveService();
