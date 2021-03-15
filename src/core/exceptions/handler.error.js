import httpStatus from 'http-status-codes';
import { logger } from '../../config/boot/boot.logger';

function Handler() {
  this.error = error => logger.error(error);
}

const errorHandler = (err, req, res, next) => {
  const handler = new Handler();

  handler.error(err);

  const statusCode = err.statusCode ? err.statusCode : httpStatus.INTERNAL_SERVER_ERROR;

  const body = {
    error: err.name ? err.name : 'Exception',
    message: err.message || err || httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR),
  };
  res.status(statusCode).json(body);
};

const configErrorHandler = app => {
  app.use(errorHandler);
};

export default configErrorHandler;
