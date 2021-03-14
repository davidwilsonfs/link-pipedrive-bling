import { parse } from 'js2xmlparser';

export class AdapterJson {
  constructor() {
    console.log(parse);
    this.parser = parse;
  }

  convertToXml(data) {
    return this.parser('pedido', data);
  }
}
