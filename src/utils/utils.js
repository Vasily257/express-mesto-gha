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
