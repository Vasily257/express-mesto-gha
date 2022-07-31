const { Card } = require('../models/cardModels');
const { createNotFoundError, showErrorMessage } = require('../utils/utils');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    showErrorMessage(err, res);
  }
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  try {
    const card = await Card.create({ name, link, owner });

    res.send(card);
  } catch (err) {
    showErrorMessage(err, res);
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id).orFail(() => createNotFoundError());

    res.send(card);
  } catch (err) {
    showErrorMessage(err, res);
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true }
    ).orFail(() => createNotFoundError());

    res.send(card);
  } catch (err) {
    showErrorMessage(err, res);
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    ).orFail(() => createNotFoundError());

    res.send(card);
  } catch (err) {
    showErrorMessage(err, res);
  }
};
