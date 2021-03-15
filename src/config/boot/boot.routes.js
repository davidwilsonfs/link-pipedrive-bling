import cors from 'cors';
import webhooksRouter from '../../core/webhooks/webhook.routing';
import ordersRouter from '../../modules/order/order.routing';

export default app => {
  app.use(cors());

  app.use(`${process.env.API_BASE_PATH}/webhooks`, webhooksRouter);
  app.use(`${process.env.API_BASE_PATH}/orders`, ordersRouter);
};
