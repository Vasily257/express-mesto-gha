const { User } = require('../models/userModels');

const {
  handleCastError,
  createNotFoundError,
  handleNotFoundError,
  handleDefaultError,
} = require('../utils/utils');

module.exports.getUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).orFail(() =>
      createNotFoundError('Пользователь с таким id не найден')
    );

    res.send(user);
  } catch (err) {
    switch (err.name) {
      case 'CastError':
        handleCastError(res, 'Неправильно указан id пользователя.');
        break;
      case 'DocumentNotFoundError':
        handleNotFoundError(res, err);
        break;
      default:
        handleDefaultError(err);
    }
  }
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
