import axios from 'axios';

export class NotifyOrder {
  constructor(data) {
    this.data = data;
    this.instance = axios.create({
      baseURL: 'https://bling.com.br/Api/v2',
    });
  }

  notifyToBling(data) {
    this.instance
      .post('/pedido/json/', {
        xml: data,
        apikey: 'b929c70dcc2edc78869a42e1acb535ac4efa11ec0e94960b7e51558e89266111de20fd05',
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
