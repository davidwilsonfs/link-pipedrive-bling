import axios from 'axios';

import PipedriveService from './pipedrive.service';

export class NotifyOrder {
  constructor(data, orderStore) {
    this.data = data;
    this.store = orderStore;
    this.instance = axios.create({
      baseURL: 'https://bling.com.br/Api/v2',
    });
  }

  notifyToBling() {
    this.instance
      .post('/pedido/json/', null, {
        params: {
          xml: this.data,
          apikey: 'b929c70dcc2edc78869a42e1acb535ac4efa11ec0e94960b7e51558e89266111de20fd05',
        },
      })
      .then(res => {
        if (!res.data.retorno.erros) {
          PipedriveService.registeOrder(this.store);
        } else {
          console.log(res.data.retorno.erros);
        }
      })
      .catch(err => {
        console.log(err.retorno.erros);
      });
  }
}
