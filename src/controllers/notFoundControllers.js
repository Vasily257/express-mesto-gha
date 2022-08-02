const { NOT_FOUND_STATUS } = require('../utils/constants');

module.exports.getNothing = async (req, res) => {
  res.status(NOT_FOUND_STATUS);
  res.send({ message: 'Страница не найдена' });
};
