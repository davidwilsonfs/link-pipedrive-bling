import blingClient from '../../core/clients-http/bling.client';
import PipedriveService from './pipedrive.service';

export class NotifyOrder {
  constructor(data, orderStore, isUpdate) {
    this.data = data;
    this.store = orderStore;
    this.isUpdate = isUpdate;
  }

  notifyToBling() {
    blingClient
      .createOrder(this.data)
      .then(res => {
        if (!res.data.retorno.erros) {
          PipedriveService.registeOrder(this.store);
        } else {
          console.log(res.data.retorno.erros);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
