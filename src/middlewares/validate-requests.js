const { celebrate, Joi } = require('celebrate');

const userNameRules = Joi.string().min(2).max(30);
const aboutRules = Joi.string().min(2).max(30);
const emailRules = Joi.string().required().email();
const passwordRules = Joi.string().required();

const cardNameRules = Joi.string().min(2).max(30);
const cardOwnerRules = Joi.string().alphanum().length(24);
const likesRules = Joi.array();
const createdDateRules = Joi.date();

const linkRules = Joi.string();
const idRules = Joi.string().alphanum().length(24);
const authorizationRules = Joi.string().required().regex(/Bearer \w+/);

// User data validation

module.exports.validateUserData = celebrate({
  body: Joi.object().keys({
    name: userNameRules,
    about: aboutRules,
    avatar: linkRules,
    email: emailRules,
    password: passwordRules,
  }),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: userNameRules,
    about: aboutRules,
  }),
  headers: Joi.object().keys({
    authorization: authorizationRules,
  }).unknown(true),
});

module.exports.validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: linkRules,
  }),
  headers: Joi.object().keys({
    authorization: authorizationRules,
  }).unknown(true),
});

// Cards data validation

module.exports.validateCardData = celebrate({
  body: Joi.object().keys({
    name: cardNameRules,
    link: linkRules,
    owner: cardOwnerRules,
    likes: likesRules,
    createdAt: createdDateRules,
  }),
  headers: Joi.object().keys({
    authorization: authorizationRules,
  }).unknown(true),
});

// General data validation

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    id: idRules,
  }),
  headers: Joi.object().keys({
    authorization: authorizationRules,
  }).unknown(true),
});
