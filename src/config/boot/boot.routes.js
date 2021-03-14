import cors from 'cors';
import pipedriveRouter from '../../modules/pipedrive/pipedrive.routing';

export default app => {
  app.use(cors());

  app.use(`${process.env.API_BASE_PATH}/pipedrive`, pipedriveRouter);
};
