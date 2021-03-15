import blingClient from '../../core/clients-http/bling.client';
import { OrderMalformedError } from './pipedrive.exceptions';

export class PipedriveNotifier {
  constructor(data) {
    this.data = data;
  }

  async notifyOrderToBling() {
    try {
      const { data } = await blingClient.createOrder(this.data);

      if (data.retorno.erros) {
        new OrderMalformedError();
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
}
