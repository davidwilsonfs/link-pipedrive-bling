import PipedriveClient from './pipedrive.client';

class PipedriveLayer {
  constructor() {
    this.pipedriveClient = PipedriveClient;
  }

  async getDeals() {
    let deals = [];
    let moreItemsInCollection = true;
    let start = 0;

    do {
      const { data, additional_data } = await this.pipedriveClient.getDeals(start);
      deals = deals.concat(data);

      start = additional_data.pagination.next_start;
      moreItemsInCollection = additional_data.pagination.more_items_in_collection;
    } while (moreItemsInCollection);

    return { deals };
  }

  async getProducts(deal_id) {
    let products = [];
    let moreItemsInCollection = true;
    let start = 0;

    do {
      const { data, additional_data } = await this.pipedriveClient.getDealProducts(deal_id, start);

      products = products.concat(data);

      start = additional_data.pagination.next_start;
      moreItemsInCollection = additional_data.pagination.more_items_in_collection;
    } while (moreItemsInCollection);

    return { products };
  }
}

export { PipedriveLayer };
