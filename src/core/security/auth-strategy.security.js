import TokenGenerator from './token-generator.security';
import * as exceptions from './excpetions.secutiry';

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const authorized = (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers.authorization;

    if (!token) {
      exceptions.unauthorizedUser();
    }

    const { user } = new TokenGenerator(process.env.JWT_PRIVATE_KEY).decode(
      token
    );

    req.user = user;
    next();
  } catch (e) {
    throw e;
  }
};
