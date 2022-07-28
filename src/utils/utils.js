module.exports.logger = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`${req.method}: ${req.path}`);
  // eslint-disable-next-line no-console
  console.log('Запрос залогирован!');
  next();
};
