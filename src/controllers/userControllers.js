const { User } = require('../models/userModels');

const { createNotFoundError, showErrorMessage } = require('../utils/utils');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    showErrorMessage(err, res);
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).orFail(() => createNotFoundError());

    res.send(user);
  } catch (err) {
    showErrorMessage(err, res);
  }
};

module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create(
      { name, about, avatar },
      {
        new: true,
        runValidators: true,
        upsert: false,
      }
    );

    res.send(user);
  } catch (err) {
    showErrorMessage(err, res);
  }
};

module.exports.updateProfile = async (req, res) => {
  const { name, about } = req.body;
  try {
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
    ).orFail(() => createNotFoundError());

    res.send(user);
  } catch (err) {
    showErrorMessage(err, res);
  }
};

module.exports.updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
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
    ).orFail(() => createNotFoundError());

    res.send(user);
  } catch (err) {
    showErrorMessage(err, res);
  }
};
