const { Card } = require('../models/cardModels');

module.exports.getCards = async (req, res) => {
  const cards = await Card.find({});
  res.send(cards);
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  const card = await Card.create({ name, link, owner });

  res.send(card);
};

module.exports.deleteCard = async (req, res) => {
  const card = await Card.findByIdAndDelete(req.params.id);

  res.send(card);
};

module.exports.likeCard = async (req, res) => {
  const card = await Card.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  );

  res.send(card);
};

module.exports.dislikeCard = async (req, res) => {
  const card = await Card.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  );

  res.send(card);
};
