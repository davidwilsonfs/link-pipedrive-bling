import { ClientHttp } from './client-http';

class BlingClient extends ClientHttp {
  constructor() {
    super();
    this._setBaseUrl(process.env.BLING_BASE_URL);
    this._setBaseParams({ apikey: process.env.BLING_API_TOKEN });
  }

  async createOrder(data) {
    return this.htppClient.post('/pedido/json/', null, {
      params: {
        xml: data,
      },
    });
  }
}

export default new BlingClient();
