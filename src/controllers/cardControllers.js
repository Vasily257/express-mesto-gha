const { Card } = require('../models/cardModels');
const {
  handlesuccessfulСreation,
  createNotFoundError,
  handleIncorrectDataError,
  handleNotFoundError,
  handleDefaultError,
} = require('../utils/utils');

const {
  CARD_CREATION_ERROR_TEXT,
  INCORRECT_CARD_ID_ERROR_TEXT,
  MISSING_CARD_ID_ERROR_TEXT,
} = require('../utils/constants');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    handleDefaultError(err);
  }
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  try {
    const card = await Card.create({ name, link, owner });
    handlesuccessfulСreation(res, card);
  } catch (err) {
    switch (err.name) {
      case 'ValidationError':
        handleIncorrectDataError(res, CARD_CREATION_ERROR_TEXT);
        break;
      default:
        handleDefaultError(err);
    }
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id).orFail(() => {
      createNotFoundError(MISSING_CARD_ID_ERROR_TEXT);
    });

    res.send(card);
  } catch (err) {
    switch (err.name) {
      case 'CastError':
        handleIncorrectDataError(res, INCORRECT_CARD_ID_ERROR_TEXT);
        break;
      case 'DocumentNotFoundError':
        handleNotFoundError(res, err);
        break;
      default:
        handleDefaultError(err);
    }
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true },
    ).orFail(() => createNotFoundError(MISSING_CARD_ID_ERROR_TEXT));

    res.send(card);
  } catch (err) {
    switch (err.name) {
      case 'CastError':
        handleIncorrectDataError(res, INCORRECT_CARD_ID_ERROR_TEXT);
        break;
      case 'DocumentNotFoundError':
        handleNotFoundError(res, err);
        break;
      default:
        handleDefaultError(err);
    }
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.user._id },
      },
      { new: true },
    ).orFail(() => createNotFoundError(MISSING_CARD_ID_ERROR_TEXT));

    res.send(card);
  } catch (err) {
    switch (err.name) {
      case 'CastError':
        handleIncorrectDataError(res, INCORRECT_CARD_ID_ERROR_TEXT);
        break;
      case 'DocumentNotFoundError':
        handleNotFoundError(res, err);
        break;
      default:
        handleDefaultError(err);
    }
  }
};
