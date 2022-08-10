const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models/userModels');

const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');

const { handlesuccessfulСreation } = require('../utils/utils');
const {
  USER_CREATION_ERROR_TEXT,
  USER_UPDATE_PROFILE_ERROR_TEXT,
  USER_UPDATE_AVATAR_ERROR_TEXT,
  INCORRECT_USER_ID_ERROR_TEXT,
  MISSING_USER_ID_ERROR_TEXT,
  EXISTING_USER_ERROR,
} = require('../utils/constants');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail(() => {
      throw new NotFoundError(MISSING_USER_ID_ERROR_TEXT);
    });

    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(INCORRECT_USER_ID_ERROR_TEXT));
    }

    next(err);
  }
};

module.exports.getCurrentUser = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id).orFail(() => {
      throw new NotFoundError(MISSING_USER_ID_ERROR_TEXT);
    });

    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });

    handlesuccessfulСreation(res, user);
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError(EXISTING_USER_ERROR));
    }

    if (err.name === 'ValidationError') {
      next(new BadRequestError(USER_CREATION_ERROR_TEXT));
    }

    next(err);
  }
};

module.exports.updateProfile = async (req, res, next) => {
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
      },
    ).orFail(() => {
      throw new NotFoundError(MISSING_USER_ID_ERROR_TEXT);
    });

    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(USER_UPDATE_PROFILE_ERROR_TEXT));
    }

    if (err.name === 'CastError') {
      next(new BadRequestError(INCORRECT_USER_ID_ERROR_TEXT));
    }

    next(err);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
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
      },
    ).orFail(() => {
      throw new NotFoundError(MISSING_USER_ID_ERROR_TEXT);
    });

    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(USER_UPDATE_AVATAR_ERROR_TEXT));
    }

    if (err.name === 'CastError') {
      next(new BadRequestError(INCORRECT_USER_ID_ERROR_TEXT));
    }

    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, 'super-secret-password', { expiresIn: '7d' });

    res.send({ token });
  } catch (err) {
    next(err);
  }
};
