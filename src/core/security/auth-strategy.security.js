import { UnauthorizedUserError } from './excpetions.secutiry';

class Authentication {
  constructor() {}

  basicAuthentication = (req, res, next) => {
    try {
      const token = req.body.token || req.query.token || req.headers.authorization;

      if (!token) {
        new UnauthorizedUserError();
      }

      const base64Credentials = req.headers.authorization.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      const [username, password] = credentials.split(':');

      if (
        username !== process.env.BASIC_AUTH_USERNAME &&
        password !== process.env.BASIC_AUTH_PASSWORD
      ) {
        new UnauthorizedUserError();
      }

      next();
    } catch (e) {
      throw e;
    }
  };
}

export default new Authentication();
