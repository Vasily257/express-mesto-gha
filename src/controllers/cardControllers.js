const { Card } = require('../models/cardModels');

const NotFoundError = require('../errors/not-found-error');

const { handlesuccessfulСreation } = require('../utils/utils');

const { MISSING_CARD_ID_ERROR_TEXT } = require('../utils/constants');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  try {
    const card = await Card.create({ name, link, owner });

    handlesuccessfulСreation(res, card);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id).orFail(() => {
      throw new NotFoundError(MISSING_CARD_ID_ERROR_TEXT);
    });

    res.send(card);
  } catch (err) {
    next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true },
    ).orFail(() => {
      throw new NotFoundError(MISSING_CARD_ID_ERROR_TEXT);
    });

    res.send(card);
  } catch (err) {
    next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.user._id },
      },
      { new: true },
    ).orFail(() => {
      throw new NotFoundError(MISSING_CARD_ID_ERROR_TEXT);
    });

    res.send(card);
  } catch (err) {
    next(err);
  }
};
