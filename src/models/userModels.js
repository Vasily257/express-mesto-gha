const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { AUTHORIZATION_FAILED_TEXT } = require('../utils/constants');
const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'минимальная длина имени пользователя — 2 символа'],
    maxlength: [30, 'максимальная длина имени пользователя — 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'минимальная длина описания пользователя — 2 символа'],
    maxlength: [30, 'максимальная длина описания пользователя — 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.statics.findUserByCredentials = async function checkEmailAndPassWord(email, password) {
  const user = await this.findOne({ email }).orFail(() => {
    throw new UnauthorizedError(AUTHORIZATION_FAILED_TEXT);
  });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError(AUTHORIZATION_FAILED_TEXT);
  }

  return user;
};

module.exports.User = mongoose.model('user', userSchema);
