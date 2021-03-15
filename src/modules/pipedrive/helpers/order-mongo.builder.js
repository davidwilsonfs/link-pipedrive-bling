export class OrderMongoBuilder {
  constructor(data) {
    this.data = data;
    this.order = {};
  }

  buildOrder() {
    this.order = {
      order_id: deal_details.id,
      currency: deal_details.currency,
      seller: {
        name: deal_details.creator_user_id.name,
        email: deal_details.creator_user_id.email,
      },
      client: {
        name: deal_details.person_id.name,
        // email: {
        //   ,
        // },
        // phone: {
        //   ,
        // },
      },
      status: deal_details.status,
      products_count: deal_details.products_count,
      value: deal_details.value,
    };
  }
}
