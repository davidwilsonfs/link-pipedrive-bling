class OrderBuilder {
  constructor(data) {
    this.data = data;

    this.order = {
      pedido: {
        data: data.deal_details.won_time,
        loja: data.org_id.name,
        vendedor: data.deal_details.creator_user_id.name,
        numero: data.deal_details.id,
      },
    };
  }

  buildClient() {
    this.order = {
      pedido: {
        ...this.order,
        client: {
          name: data.deal_details.person_id.name,
          fone: data.deal_details.person_id.phone(el => {
            el.primary !== 'mobile';
          })[0].value,
          celular: data.deal_details.person_id.phone(el => {
            el.primary === 'mobile';
          })[0].value,
          email: data.deal_details.person_id.email.filter(el => {
            el.primary === true;
          })[0].value,
        },
      },
    };
  }

  buildItens() {
    if (_.isEmpty(data.products)) {
      this.order = {
        pedido: {
          ...this.order,
          itens: [],
        },
      };
      data.products.forEach(el => {
        this.order.pedido.itens.push({
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
