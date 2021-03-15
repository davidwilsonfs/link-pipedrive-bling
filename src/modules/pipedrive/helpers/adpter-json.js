import { parse } from 'js2xmlparser';

export class AdapterJson {
  constructor() {
    this.parser = parse;
  }

  convertToXml(data) {
    return this.parser('pedido', data);
  }
}
