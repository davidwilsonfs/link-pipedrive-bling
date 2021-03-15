import _ from 'lodash';
export class OrderMongoBuilder {
  constructor(data) {
    this.data = data;
    this.order = {};
  }

  buildOrder() {
    this.order = {
      order_id: this.data.deal_details.id,
      currency: this.data.deal_details.currency,
      seller: {
        name: this.data.deal_details.creator_user_id.name,
        email: this.data.deal_details.creator_user_id.email,
      },
      client: {
        name: this.data.deal_details.person_id.name,
        email: this._getEmail(),
        phone: _.isEmpty(this._getCellPhone()) ? '' : this._getCellPhone()[0].value,
      },
      status: this.data.deal_details.status,
      products_count: this.data.deal_details.products_count,
      value: this.data.deal_details.value,
    };
  }

  _getCellPhone() {
    return this.data.deal_details.person_id.phone.filter(el => {
      el.label === 'mobile';
    });
  }

  _getEmail() {
    return this.data.deal_details.person_id.email.filter(el => el.primary)[0].value;
  }
}
