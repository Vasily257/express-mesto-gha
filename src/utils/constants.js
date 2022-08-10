const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
const UNAUTHORIZED_STATUS = 401;
const NOT_FOUND_STATUS = 404;
const INTERNAL_SERVER_ERROR_STATUS = 500;

const USER_CREATION_ERROR_TEXT = 'Переданы некорректные данные при создании пользователя.';
const USER_UPDATE_PROFILE_ERROR_TEXT = 'Переданы некорректные данные при обновлении профиля пользователя.';
const USER_UPDATE_AVATAR_ERROR_TEXT = 'Переданы некорректные данные при обновлении аватара пользователя.';
const USER_LOGIN_ERROR_TEXT = 'Пользователь с такой почтой или паролем не найден.';
const USER_LOGIN_SUCCESS_TEXT = 'Вы успешно авторизовались.';

const INCORRECT_USER_ID_ERROR_TEXT = 'Неправильно указан _id пользователя.';
const MISSING_USER_ID_ERROR_TEXT = 'По указанному _id пользователь не найден.';

const CARD_CREATION_ERROR_TEXT = 'Переданы некорректные данные при создании карточки.';
const INCORRECT_CARD_ID_ERROR_TEXT = 'Неправильно указан _id карточки.';
const MISSING_CARD_ID_ERROR_TEXT = 'По указанному _id карточка не найдена.';

const EXISTING_USER_ERROR = 'Такой пользователь уже существует.';

const SERVER_ERROR_TEXT = 'Внутренняя ошибка сервера.';

module.exports = {
  CREATED_STATUS,
  UNAUTHORIZED_STATUS,
  BAD_REQUEST_STATUS,
  NOT_FOUND_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,

  USER_CREATION_ERROR_TEXT,
  USER_UPDATE_PROFILE_ERROR_TEXT,
  USER_UPDATE_AVATAR_ERROR_TEXT,
  USER_LOGIN_ERROR_TEXT,
  USER_LOGIN_SUCCESS_TEXT,
  EXISTING_USER_ERROR,

  INCORRECT_USER_ID_ERROR_TEXT,
  MISSING_USER_ID_ERROR_TEXT,
  CARD_CREATION_ERROR_TEXT,
  INCORRECT_CARD_ID_ERROR_TEXT,
  MISSING_CARD_ID_ERROR_TEXT,

  SERVER_ERROR_TEXT,
};
