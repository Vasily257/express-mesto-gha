const { User } = require('../models/userModels');

const {
  handlesuccessfulСreation,
  createNotFoundError,
  handleIncorrectDataError,
  handleNotFoundError,
  handleDefaultError,
} = require('../utils/utils');

const {
  USER_CREATION_ERROR_TEXT,
  USER_UPDATE_PROFILE_ERROR_TEXT,
  USER_UPDATE_AVATAR_ERROR_TEXT,
  INCORRECT_USER_ID_ERROR_TEXT,
  MISSING_USER_ID_ERROR_TEXT,
} = require('../utils/constants');

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
      createNotFoundError(MISSING_USER_ID_ERROR_TEXT)
    );

    res.send(user);
  } catch (err) {
    switch (err.name) {
      case 'CastError':
        handleIncorrectDataError(res, INCORRECT_USER_ID_ERROR_TEXT);
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
    const user = await User.create({ name, about, avatar });

    handlesuccessfulСreation(res, user);
  } catch (err) {
    switch (err.name) {
      case 'ValidationError':
        handleIncorrectDataError(res, USER_CREATION_ERROR_TEXT);
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
    ).orFail(() => createNotFoundError(MISSING_USER_ID_ERROR_TEXT));

    res.send(user);
  } catch (err) {
    switch (err.name) {
      case 'ValidationError':
        handleIncorrectDataError(res, USER_UPDATE_PROFILE_ERROR_TEXT);
        break;
      case 'CastError':
        handleIncorrectDataError(res, INCORRECT_USER_ID_ERROR_TEXT);
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
    ).orFail(() => createNotFoundError(MISSING_USER_ID_ERROR_TEXT));

    res.send(user);
  } catch (err) {
    switch (err.name) {
      case 'ValidationError':
        handleIncorrectDataError(res, USER_UPDATE_AVATAR_ERROR_TEXT);
        break;
      case 'CastError':
        handleIncorrectDataError(res, INCORRECT_USER_ID_ERROR_TEXT);
        break;
      case 'DocumentNotFoundError':
        handleNotFoundError(res, err);
        break;
      default:
        handleDefaultError(err);
    }
  }
};
