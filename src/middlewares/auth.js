const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-error');
const { AUTHORIZATION_WARNING_TEXT } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(AUTHORIZATION_WARNING_TEXT);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-secret-password');
  } catch (err) {
    next(new UnauthorizedError(AUTHORIZATION_WARNING_TEXT));
  }

  req.user = payload;

  next();
};
