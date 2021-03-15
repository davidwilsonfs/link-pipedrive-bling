import blingClient from '../../core/clients-http/bling.client';
// import orderService from '../order/order.service';

export class PipedriveNotifier {
  constructor(data) {
    this.data = data;
  }

  async notifyOrderToBling() {
    try {
      const { data } = await blingClient.createOrder(this.data);

      //   if (res.data.retorno.erros) {
      //     // orderMalformed;
      //   }
      // })
      // .catch(err => {
      //   console.log(err);
      // });
    } catch (error) {
      throw error;
    }
  }
}
