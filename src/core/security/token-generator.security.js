import jwt from 'jsonwebtoken';
import * as exceptions from './excpetions.secutiry';

const options = {
  keyid: '1',
  noTimestamp: false,
  expiresIn: '2d',
};

function TokenGenerator(secretOrPrivateKey) {
  this.secretOrPrivateKey = secretOrPrivateKey;
  this.options = options;
}

TokenGenerator.prototype.sign = function(payload) {
  const signOptions = {
    audience: 'myaud',
    issuer: 'myissuer',
    jwtid: '1',
    subject: 'user',
  };
  const jwtSignOptions = Object.assign({}, signOptions, this.options);
  return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
};

TokenGenerator.prototype.decode = function(accessToken) {
  try {
    return jwt.verify(accessToken, this.secretOrPrivateKey);
  } catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        exceptions.tokenExpiredError();
        break;
      case 'JsonWebTokenError':
        exceptions.jsonWebTokenError();
        break;
      case 'NotBeforeError':
        exceptions.notBeforeError();
        break;
      default:
        exceptions.unauthorizedUser();
    }
  }
};

export default TokenGenerator;
