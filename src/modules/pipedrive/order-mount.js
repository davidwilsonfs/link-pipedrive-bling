export const orderMount = ({ deal_details }) => {
  return {
    oder_id: deal_details.id,
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
    products_count: deal_details.products_count,
    value: deal_details.value,
    created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
  };
};
