const users = require('../../users.json');

module.exports.getUsers = (req, res) => {
  res.send(users);
};

module.exports.getUserById = (req, res) => {
  res.send(users.find(({ _id }) => _id === req.params.id));
};

module.exports.createUser = (req, res) => {
  res.send(req.body);
};
