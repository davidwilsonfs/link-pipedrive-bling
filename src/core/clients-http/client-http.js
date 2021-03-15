import axios from 'axios';

export class ClientHttp {
  constructor() {
    this.htppClient = axios.create({});
  }

  _setBaseUrl(baseURL) {
    this.htppClient.defaults.baseURL = baseURL;
  }

  _setBaseParams(params) {
    this.htppClient.defaults.params = params;
  }
}
