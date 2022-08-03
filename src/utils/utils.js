const {
  CREATED_STATUS,
  BAD_REQUEST_STATUS,
  NOT_FOUND_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  SERVER_ERROR_TEXT,
} = require('./constants');

// Requests handlers

module.exports.handlesuccessfulСreation = (res, createdObject) => {
  res.status(CREATED_STATUS);
  res.send(createdObject);
};

module.exports.createNotFoundError = (errorText) => {
  const err = new Error(errorText);
  err.name = 'DocumentNotFoundError';
  throw err;
};

module.exports.handleIncorrectDataError = (res, errorText) => {
  res.status(BAD_REQUEST_STATUS);
  res.send({ message: errorText });
};

module.exports.handleNotFoundError = (res, err) => {
  res.status(NOT_FOUND_STATUS);
  res.send({ message: err.message });
};

module.exports.handleDefaultError = (res) => {
  res.status(INTERNAL_SERVER_ERROR_STATUS);
  res.send({ message: SERVER_ERROR_TEXT });
};
