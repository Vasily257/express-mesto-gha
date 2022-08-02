const express = require('express');
const { getNothing } = require('../controllers/notFoundControllers');

const notFoundRoutes = express.Router();

notFoundRoutes.get('/', getNothing);
notFoundRoutes.post('/', express.json(), getNothing);
notFoundRoutes.put('/', express.json(), getNothing);
notFoundRoutes.patch('/', express.json(), getNothing);
notFoundRoutes.delete('/', getNothing);

module.exports = {
  notFoundRoutes,
};
