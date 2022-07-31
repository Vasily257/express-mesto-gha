const {
  BAD_REQUEST_STATUS,
  NOT_FOUND_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
} = require('./constants');

module.exports.logger = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`${req.method}: ${req.path}`);
  // eslint-disable-next-line no-console
  console.log('Запрос залогирован!');

  next();
};

module.exports.addTempUser = (req, res, next) => {
  req.user = {
    _id: '62e25a846c384130a4d018c8',
    name: 'Алёша Попович',
    about: 'Богатырь',
    avatar: 'https://pp.userapi.com/c5442/u17339201/-6/z_90119408.jpg',
  };

  next();
};

// Error handlers

module.exports.handleIncorrectDataError = (res, errorText) => {
  res.status(BAD_REQUEST_STATUS);
  res.send({ message: errorText });
};

module.exports.createNotFoundError = (errorText) => {
  const err = new Error(errorText);
  err.name = 'DocumentNotFoundError';
  return err;
};

module.exports.handleNotFoundError = (res, err) => {
  res.status(NOT_FOUND_STATUS);
  res.send({ message: err.message });
};

module.exports.handleDefaultError = (res) => {
  res.status(INTERNAL_SERVER_ERROR_STATUS);
  res.send({ message: 'Внутренняя ошибка сервера' });
};
