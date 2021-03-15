import { ClientHttp } from './client-http';

class PipedriveClient extends ClientHttp {
  constructor() {
    super();
    this._setBaseUrl(process.env.PIPEDRIVE_BASE_URL);
    this._setBaseParams({ api_token: process.env.PIPEDRIVE_API_TOKEN });
  }

  async getDealDetails(id) {
    return this.htppClient
      .get(`/deals/${id}`)
      .then(res => ({ ...res.data }))
      .catch(err => console.log(err));
  }

  async getDealProducts(deal_id) {
    try {
      let products = [];
      let moreItemsInCollection = true;
      let start = 0;

      do {
        const {
          data: { data, additional_data },
        } = await this.htppClient.get(`/deals/${deal_id}/products`, {
          params: {
            start,
          },
        });

        if (data) products = products.concat(data);

        start = additional_data.pagination.next_start;
        moreItemsInCollection = additional_data.pagination.more_items_in_collection;
      } while (moreItemsInCollection);

      return { products };
    } catch (error) {
      throw error;
    }
  }

  async getDeals() {
    try {
      let deals = [];
      let moreItemsInCollection = true;
      let start = 0;

      do {
        const {
          data: { data, additional_data },
        } = await this.htppClient.get(`/deals`, {
          params: {
            start: start,
          },
        });

        if (data) deals = deals.concat(data);

        start = additional_data.pagination.next_start;
        moreItemsInCollection = additional_data.pagination.more_items_in_collection;
      } while (moreItemsInCollection);

      return { deals };
    } catch (error) {
      throw error;
    }
  }
}

export default new PipedriveClient();
