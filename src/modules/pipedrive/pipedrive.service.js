import PipedriveClient from './pipedrive.client';
import { OrderBuilder } from './order.builder';

export class PipedriveService {
  constructor() {}

  async generateOrder(data) {
    const dealDetails = await PipedriveClient.getDealDetails(data.id);
    const dealProducts = await PipedriveClient.getDealProducts(data.id);

    const builder = new OrderBuilder({
      products: dealProducts.data,
      deal_details: dealDetails.data,
    });

    builder.buildClient();
    builder.buildItens();

    return builder.order;
  }
}
