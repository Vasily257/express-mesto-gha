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
