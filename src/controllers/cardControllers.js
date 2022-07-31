const { Card } = require('../models/cardModels');
const {
  handleIncorrectDataError,
  createNotFoundError,
  handleNotFoundError,
  handleDefaultError,
} = require('../utils/utils');

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

    res.send(card);
  } catch (err) {
    switch (err.name) {
      case 'ValidationError':
        handleIncorrectDataError(res, 'Переданы некорректные данные при создании карточки.');
        break;
      default:
        handleDefaultError(err);
    }
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id).orFail(() =>
      createNotFoundError('Карточка по указанному _id не найдена.')
    );

    res.send(card);
  } catch (err) {
    switch (err.name) {
      case 'CastError':
        handleIncorrectDataError(res, 'Неправильно указан _id карточки.');
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
      { new: true }
    ).orFail(() => createNotFoundError('Карточка по указанному _id не найдена.'));

    res.send(card);
  } catch (err) {
    switch (err.name) {
      case 'CastError':
        handleIncorrectDataError(res, 'Переданы некорректные данные для постановки/снятии лайка.');
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
      { new: true }
    ).orFail(() => createNotFoundError('Карточка по указанному _id не найдена.'));

    res.send(card);
  } catch (err) {
    switch (err.name) {
      case 'CastError':
        handleIncorrectDataError(res, 'Переданы некорректные данные для постановки/снятии лайка.');
        break;
      case 'DocumentNotFoundError':
        handleNotFoundError(res, err);
        break;
      default:
        handleDefaultError(err);
    }
  }
};
