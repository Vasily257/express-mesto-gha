const process = require('process');

const jwt = require('jsonwebtoken');

const { CREATED_STATUS } = require('./constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.handlesuccessfulСreation = (res, createdObject) => {
  res.status(CREATED_STATUS);
  res.send(createdObject);
};

module.exports.jwtSign = (user) => jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
  expiresIn: '7d',
});

module.exports.jwtVerify = (token) => jwt.verify(token, JWT_SECRET);
