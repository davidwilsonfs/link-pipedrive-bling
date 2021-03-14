import PipedriveClient from './pipedrive.client';
import { OrderBuilder } from './order.builder';
import * as exception from './pipedrive.exceptions';
import { STAGE_WON } from './pipedrive.constants';
class PipedriveService {
  async createOrder(data) {
    try {
      if (data.status !== STAGE_WON) {
        exception.stageNotReached();
      }

      const dealDetails = await PipedriveClient.getDealDetails(data.id);
      const dealProducts = await PipedriveClient.getDealProducts(data.id);

      const builder = new OrderBuilder({
        products: dealProducts,
        deal_details: dealDetails,
      });

      builder.buildClient();
      builder.buildItens();

      return builder.order;
    } catch (error) {
      throw error;
    }
  }
}

export default new PipedriveService();
