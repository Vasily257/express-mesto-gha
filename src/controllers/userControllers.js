const { User } = require('../models/userModels');

module.exports.getUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

module.exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
};

module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  const user = await User.create({ name, about, avatar });

  res.send(user);
};
