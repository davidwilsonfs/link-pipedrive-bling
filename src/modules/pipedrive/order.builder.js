import _ from 'lodash';

export class OrderBuilder {
  constructor(data) {
    this.data = data;

    this.order = {
      data: data.deal_details.won_time,
      loja: data.deal_details.org_id.name,
      vendedor: data.deal_details.creator_user_id.name,
      numero: data.deal_details.id,
    };
  }

  buildClient() {
    this.order = {
      ...this.order,
      cliente: {
        name: this.data.deal_details.person_id.name,
        fone: _.isEmpty(
          this.data.deal_details.person_id.phone.filter(el => {
            el.label !== 'mobile';
          })
        )
          ? ''
          : this.data.deal_details.person_id.phone.filter(el => {
              el.label === 'mobile';
            })[0].value,
        celular: _.isEmpty(
          this.data.deal_details.person_id.phone.filter(el => {
            el.label !== 'mobile';
          })
        )
          ? ''
          : this.data.deal_details.person_id.phone.filter(el => {
              el.label === 'mobile';
            })[0].value,
        email: this.data.deal_details.person_id.email.filter(el => el.primary)[0].value,
      },
    };
  }

  buildItens() {
    if (!_.isEmpty(this.data.products)) {
      this.order = {
        ...this.order,
        itens: [],
      };

      this.data.products.forEach(el => {
        this.order.itens.push({
          codigo: el.id,
          descricao: el.name,
          qtde: el.quantity,
          vlr_unit: el.item_price,
          vlr_desconto: el.sum_no_discount - el.sum,
        });
      });
    }
  }
}
