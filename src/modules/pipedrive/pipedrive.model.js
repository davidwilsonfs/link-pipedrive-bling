import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  oder_id: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    require: true,
  },
  seller: {
    name: {
      type: String,
      required: true,
    },
  },
  client: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  description: {
    type: String,
    require: true,
  },
  products_count: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

OrderSchema.index({ created_at: -1 });

const Order = mongoose.model('Order', OrderSchema);

export { Order };
