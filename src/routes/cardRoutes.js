const express = require('express');
const { getCards, createCard, deleteCard } = require('../controllers/cardControllers');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', express.json(), createCard);
cardRoutes.delete('/:id', deleteCard);

module.exports = {
  cardRoutes,
};
