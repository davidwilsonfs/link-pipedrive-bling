import blingClient from '../../core/clients-http/bling.client';
import orderService from '../order/order.service';

export class NotifyOrder {
  constructor(data, orderStore) {
    this.data = data;
    this.store = orderStore;
  }

  notifyToBling() {
    blingClient
      .createOrder(this.data)
      .then(res => {
        if (!res.data.retorno.erros) {
          orderService.registeOrder(this.store);
        } else {
          console.log(res.data.retorno.erros);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
