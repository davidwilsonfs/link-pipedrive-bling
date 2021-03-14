import httpStatus from 'http-status-codes';
import { globalErrorHandler } from '../exceptions/global.error';

export const unauthorizedUser = () =>
  globalErrorHandler(
    {
      name: httpStatus.getStatusText(httpStatus.UNAUTHORIZED),
      code: 'UNAUTHORIZED_USER',
    },
    httpStatus.UNAUTHORIZED
  );

export const tokenExpiredError = () =>
  globalErrorHandler(
    {
      name: 'TokenExpiredError',
      code: 'TOKEN_EXPIRED',
    },
    httpStatus.UNAUTHORIZED
  );

export const jsonWebTokenError = () =>
  globalErrorHandler(
    {
      name: 'jsonWebTokenError',
      code: 'WEB_TOKEN_MALFORMED',
    },
    httpStatus.UNAUTHORIZED
  );

export const notBeforeError = () =>
  globalErrorHandler(
    {
      name: 'NotBeforeError',
      code: 'JWT_NOT_ACTIVE',
    },
    httpStatus.UNAUTHORIZED
  );

export const dontHaveEnoughPermissionToPerformThisAction = () =>
  globalErrorHandler(
    {
      name: 'notHaveEnoughPermission',
      code: 'NOT_HAVE_ENOUGH_PERMISSION_TO_PERFORM_THIS_ACTION',
    },
    httpStatus.UNAUTHORIZED
  );
