const {
  CREATED_STATUS,
  BAD_REQUEST_STATUS,
  NOT_FOUND_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  SERVER_ERROR_TEXT,
  LOGGER_TEXT,
} = require('./constants');

module.exports.logger = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`${req.method}: ${req.path}`);
  // eslint-disable-next-line no-console
  console.log(LOGGER_TEXT);

  next();
};

module.exports.addTempUser = (req, res, next) => {
  req.user = {
    _id: '62e79cd855fd2d842b7eaf5c',
  };

  next();
};

// Requests handlers

module.exports.handlesuccessfulСreation = (res, createdObject) => {
  res.status(CREATED_STATUS);
  res.send(createdObject);
};

module.exports.createNotFoundError = (errorText) => {
  const err = new Error(errorText);
  err.name = 'DocumentNotFoundError';
  return err;
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
