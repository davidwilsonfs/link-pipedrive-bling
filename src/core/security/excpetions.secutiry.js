import httpStatus from 'http-status-codes';
import { globalErrorHandler } from '../exceptions/global.error';

export class UnauthorizedUserError {
  constructor() {
    globalErrorHandler(
      {
        name: httpStatus.getStatusText(httpStatus.UNAUTHORIZED),
        code: 'UNAUTHORIZED_USER',
      },
      httpStatus.UNAUTHORIZED
    );
  }
}
