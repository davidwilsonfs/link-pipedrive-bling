import TokenGenerator from './token-generator.security';
import * as exceptions from './excpetions.secutiry';

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const authorized = (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers.authorization;

    if (!token) {
      exceptions.unauthorizedUser();
    }

    const { user } = new TokenGenerator(process.env.JWT_PRIVATE_KEY).decode(token);

    req.user = user;
    next();
  } catch (e) {
    throw e;
  }
};

export const basicAuthentication = (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers.authorization;

    if (!token) {
      exceptions.unauthorizedUser();
    }

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (
      username !== process.env.BASIC_AUTH_USERNAME &&
      password !== process.env.BASIC_AUTH_PASSWORD
    ) {
      exceptions.unauthorizedUser();
    }

    next();
  } catch (e) {
    throw e;
  }
};
