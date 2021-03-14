import PipedriveClient from './pipedrive.client';
import { OrderBuilder } from './order.builder';

class PipedriveService {
  async createOrder(data) {
    const dealDetails = await PipedriveClient.getDealDetails(data.id);
    const dealProducts = await PipedriveClient.getDealProducts(data.id);

    const builder = new OrderBuilder({
      products: dealProducts,
      deal_details: dealDetails,
    });

    builder.buildClient();
    builder.buildItens();

    return builder.order;
  }
}

export default new PipedriveService();
