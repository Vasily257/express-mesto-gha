const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardControllers');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', express.json(), createCard);
cardRoutes.delete('/:id', deleteCard);
cardRoutes.put('/:id/likes', likeCard);
cardRoutes.delete('/:id/likes', dislikeCard);

module.exports = {
  cardRoutes,
};
