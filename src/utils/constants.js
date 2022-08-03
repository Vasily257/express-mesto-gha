const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
const NOT_FOUND_STATUS = 404;
const INTERNAL_SERVER_ERROR_STATUS = 500;

const USER_CREATION_ERROR_TEXT = 'Переданы некорректные данные при создании пользователя.';
const USER_UPDATE_PROFILE_ERROR_TEXT = 'Переданы некорректные данные при обновлении профиля пользователя.';
const USER_UPDATE_AVATAR_ERROR_TEXT = 'Переданы некорректные данные при обновлении аватара пользователя.';

const INCORRECT_USER_ID_ERROR_TEXT = 'Неправильно указан _id пользователя.';
const MISSING_USER_ID_ERROR_TEXT = 'По указанному _id пользователь не найден.';

const CARD_CREATION_ERROR_TEXT = 'Переданы некорректные данные при создании карточки.';
const INCORRECT_CARD_ID_ERROR_TEXT = 'Неправильно указан _id карточки.';
const MISSING_CARD_ID_ERROR_TEXT = 'По указанному _id карточка не найдена.';

const SERVER_ERROR_TEXT = 'Внутренняя ошибка сервера.';

module.exports = {
  CREATED_STATUS,
  BAD_REQUEST_STATUS,
  NOT_FOUND_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,

  USER_CREATION_ERROR_TEXT,
  USER_UPDATE_PROFILE_ERROR_TEXT,
  USER_UPDATE_AVATAR_ERROR_TEXT,
  INCORRECT_USER_ID_ERROR_TEXT,
  MISSING_USER_ID_ERROR_TEXT,
  CARD_CREATION_ERROR_TEXT,
  INCORRECT_CARD_ID_ERROR_TEXT,
  MISSING_CARD_ID_ERROR_TEXT,
  SERVER_ERROR_TEXT,
};
