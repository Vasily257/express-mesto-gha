const { User } = require('../models/userModels');

const {
  handleIncorrectDataError,
  createNotFoundError,
  handleNotFoundError,
  handleDefaultError,
} = require('../utils/utils');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    handleDefaultError(err);
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).orFail(() =>
      createNotFoundError('Пользователь по указанному _id не найден.')
    );

    res.send(user);
  } catch (err) {
    switch (err.name) {
      case 'CastError':
        handleIncorrectDataError(res, 'Неправильно указан _id пользователя.');
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
    switch (err.name) {
      case 'ValidationError':
        handleIncorrectDataError(res, 'Переданы некорректные данные при создании пользователя');
        break;
      default:
        handleDefaultError(err);
    }
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
    ).orFail(() => createNotFoundError('Пользователь по указанному _id не найден.'));

    res.send(user);
  } catch (err) {
    switch (err.name) {
      case 'ValidationError':
        handleIncorrectDataError(res, 'Переданы некорректные данные при обновлении профиля.');
        break;
      case 'CastError':
        handleIncorrectDataError(res, 'Неправильно указан _id пользователя.');
        break;
      case 'DocumentNotFoundError':
        handleNotFoundError(res, err);
        break;
      default:
        handleDefaultError(err);
    }
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
    ).orFail(() => createNotFoundError('Пользователь по указанному _id не найден.'));

    res.send(user);
  } catch (err) {
    switch (err.name) {
      case 'ValidationError':
        handleIncorrectDataError(res, 'Переданы некорректные данные при обновлении аватара.');
        break;
      case 'CastError':
        handleIncorrectDataError(res, 'Неправильно указан _id пользователя.');
        break;
      case 'DocumentNotFoundError':
        handleNotFoundError(res, err);
        break;
      default:
        handleDefaultError(err);
    }
  }
};
