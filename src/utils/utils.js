const process = require('process');

const jwt = require('jsonwebtoken');

const { CREATED_STATUS } = require('./constants');

const { JWT_SECRET } = process.env;

module.exports.handlesuccessfulСreation = (res, createdObject) => {
  res.status(CREATED_STATUS);
  res.send(createdObject);
};

module.exports.jwtSign = (user) => jwt.sign({ _id: user._id }, JWT_SECRET, {
  expiresIn: '7d',
});

module.exports.jwtVerify = (token) => jwt.verify(token, JWT_SECRET);
