import httpStatus from 'http-status-codes';
import { globalErrorHandler } from '../../core/exceptions/global.error';
import {
  ORDER_ALREADY_EXISTS_ERROR,
  ORDER_MALFORMED_ERROR,
  STAGE_NOT_REACHED_ERROR,
} from './pipedrive.constants';

export class StageNotReachedError {
  constructor() {
    globalErrorHandler(
      {
        name: httpStatus.getStatusText(httpStatus.BAD_REQUEST),
        code: STAGE_NOT_REACHED_ERROR,
      },
      httpStatus.BAD_REQUEST
    );
  }
}

export class OrderMalformedError {
  constructor() {
    globalErrorHandler(
      {
        name: httpStatus.getStatusText(httpStatus.BAD_REQUEST),
        code: ORDER_MALFORMED_ERROR,
      },
      httpStatus.BAD_REQUEST
    );
  }
}
export class OrderAlreadyExistsError {
  constructor() {
    globalErrorHandler(
      {
        name: httpStatus.getStatusText(httpStatus.BAD_REQUEST),
        code: ORDER_ALREADY_EXISTS_ERROR,
      },
      httpStatus.BAD_REQUEST
    );
  }
}
