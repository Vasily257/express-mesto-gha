const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { USER_LOGIN_ERROR_TEXT } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'минимальная длина имени — 2 символа'],
    maxlength: [30, 'максимальная длина имени — 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,

    minlength: [2, 'минимальная длина имени — 2 символа'],
    maxlength: [30, 'максимальная длина имени — 30 символов'],
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

userSchema.static.findUserByCredentials = async function checkEmailAndPassWord(email, password) {
  const user = await this.findOne({ email }).orFail(() => {
    Promise.reject(new Error(USER_LOGIN_ERROR_TEXT));
  });

  const isPasswordValid = await bcrypt.compare(password, this.password);

  if (!isPasswordValid) {
    Promise.reject(new Error(USER_LOGIN_ERROR_TEXT));
  }

  return user;
};

module.exports.User = mongoose.model('user', userSchema);
