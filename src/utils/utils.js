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
  };

  next();
};

// Error handlers

module.exports.createNotFoundError = () => {
  const err = new Error('По указанному _id не найден пользователь или карточка.');
  err.name = 'DocumentNotFoundError';
  return err;
};

const handleIncorrectDataError = (res, errorText) => {
  res.status(BAD_REQUEST_STATUS);
  res.send({ message: errorText });
};

const handleNotFoundError = (res, err) => {
  res.status(NOT_FOUND_STATUS);
  res.send({ message: err.message });
};

const handleDefaultError = (res) => {
  res.status(INTERNAL_SERVER_ERROR_STATUS);
  res.send({ message: 'Внутренняя ошибка сервера' });
};

module.exports.showErrorMessage = (err, res) => {
  switch (err.name) {
    case 'ValidationError':
      handleIncorrectDataError(
        res,
        'Переданы некорректные данные при создании пользователя/карточки или при обновлении данных пользователя.'
      );
      break;
    case 'CastError':
      handleIncorrectDataError(res, 'Неправильно указан _id пользователя/карточки.');
      break;
    case 'DocumentNotFoundError':
      handleNotFoundError(res, err);
      break;
    default:
      handleDefaultError(err);
  }
};
