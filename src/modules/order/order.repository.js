import { Order } from './order.model';

class OrderRepository {
  constructor() {
    this.model = Order;
  }

  getAll = async options => {
    try {
      const pageNumber = parseInt(options.page || 1, 10);
      const resultsPerPage = parseInt(options.limit || 10, 10);
      const skipDocuments = parseInt((pageNumber - 1) * resultsPerPage, 10);

      let data = await this.model
        .find({})
        .sort({ created_at: -1 })
        .skip(skipDocuments)
        .limit(resultsPerPage)
        .lean();

      const values = await this.model.find().count();

      const totalCount = values || 0;

      const pageCount = Math.ceil(totalCount / resultsPerPage) || 1;

      return { data, metadata: { pageCount, totalCount } };
    } catch (e) {
      throw e;
    }
  };
  register = async data => {
    try {
      const order = new this.model(data);
      return order.save();
    } catch (e) {
      throw e;
    }
  };

  getByOrderId = async id => {
    try {
      return this.model.findOne({ order_id: id });
    } catch (e) {
      throw e;
    }
  };

  agregateOpportunities = async () => {
    try {
      const aggregate = this.model
        .aggregate()
        .group({
          _id: {
            year: { $year: '$created_at' },
            month: { $month: '$created_at' },
            day: { $dayOfMonth: '$created_at' },
          },
          all_values: { $push: '$value' },
          all_products: { $push: '$products_count' },
        })
        .project({
          date: {
            $concat: [
              { $toString: '$_id.day' },
              '-',
              { $toString: '$_id.month' },
              '-',
              { $toString: '$_id.year' },
            ],
          },
          total_won: { $sum: '$all_values' },
          total_products: { $sum: '$all_products' },
        })
        .sort({ '_id.year': 1, '_id.month': 1, '_id.day': 1 });

      return aggregate;
    } catch (e) {
      throw e;
    }
  };
}

export default new OrderRepository();
