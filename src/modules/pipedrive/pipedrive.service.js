import PipedriveClient from './pipedrive.client';
import { OrderBuilder } from './order.builder';
import * as exception from './pipedrive.exceptions';
import { STAGE_WON } from './pipedrive.constants';
import { orderMount } from './order-mount';
import * as repository from './pipedrive.repository';

class PipedriveService {
  async createOrder(data) {
    try {
      if (data.status !== STAGE_WON) {
        exception.stageNotReached();
      }

      const dealDetails = await PipedriveClient.getDealDetails(data.id);
      const dealProducts = await PipedriveClient.getDealProducts(data.id);

      const payload = {
        products: dealProducts,
        deal_details: dealDetails,
      };

      const builder = new OrderBuilder(payload);

      builder.buildClient();
      builder.buildItens();

      console.log(orderMount(payload));
      await repository.register(orderMount(payload));

      return builder.order;
    } catch (error) {
      throw error;
    }
  }
}

export default new PipedriveService();
