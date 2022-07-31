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
  const user = await User.create(
    { name, about, avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    }
  );

  res.send(user);
};

module.exports.updateProfile = async (req, res) => {
  const { name, about } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
      upsert: false,
    }
  );

  res.send(user);
};

module.exports.updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
      upsert: false,
    }
  );

  res.send(user);
};
