import _ from 'lodash';

export class OrderBlingBuilder {
  constructor(data) {
    this.data = data;
    this.order = {};
  }

  buildOrder() {
    this.order = {
      ...this.order,
      loja: this.data.deal_details.org_id.name,
      vendedor: this.data.deal_details.creator_user_id.name,
      numero: `${this.data.deal_details.id}`,
    };
  }

  buildClient() {
    this.order = {
      ...this.order,
      cliente: {
        nome: this.data.deal_details.person_id.name,
        fone: _.isEmpty(this._getPhone()) ? '' : this._getPhone()[0].value,
        celular: _.isEmpty(this._getCellPhone()) ? '' : this._getCellPhone()[0].value,
        email: this._getEmail(),
      },
    };
  }

  buildItens() {
    if (!_.isEmpty(this.data.products)) {
      this.order = {
        ...this.order,
        itens: {
          item: [],
        },
      };

      this.data.products.forEach(el => {
        this.order.itens.item.push({
          codigo: `${el.id}`,
          descricao: el.name,
          qtde: el.quantity,
          vlr_unit: el.item_price,
        });
      });
    }
  }

  _getCellPhone() {
    return this.data.deal_details.person_id.phone.filter(el => {
      el.label === 'mobile';
    });
  }

  _getPhone() {
    return this.data.deal_details.person_id.phone.filter(el => {
      el.label !== 'mobile';
    });
  }
  _getEmail() {
    return this.data.deal_details.person_id.email.filter(el => el.primary)[0].value;
  }
}
