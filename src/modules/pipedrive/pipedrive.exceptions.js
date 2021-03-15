import httpStatus from 'http-status-codes';
import { globalErrorHandler } from '../../core/exceptions/global.error';
import { STAGE_NOT_REACHED, ORDER_MALFORMED } from './pipedrive.constants';

export const stageNotReached = () =>
  globalErrorHandler(
    {
      name: httpStatus.getStatusText(httpStatus.BAD_REQUEST),
      code: STAGE_NOT_REACHED,
    },
    httpStatus.BAD_REQUEST
  );

export const stageUpdated = () =>
  globalErrorHandler(
    {
      name: httpStatus.getStatusText(httpStatus.BAD_REQUEST),
      code: STAGE_UPDATED,
    },
    httpStatus.BAD_REQUEST
  );

export const orderMalformed = () =>
  globalErrorHandler(
    {
      name: httpStatus.getStatusText(httpStatus.BAD_REQUEST),
      code: ORDER_MALFORMED,
    },
    httpStatus.BAD_REQUEST
  );
