const express = require('express');
const { getNothing } = require('../controllers/notFoundControllers');

const notFoundRoutes = express.Router();

notFoundRoutes.get('/', getNothing);
notFoundRoutes.post('/', getNothing);
notFoundRoutes.put('/', getNothing);
notFoundRoutes.patch('/', getNothing);
notFoundRoutes.delete('/', getNothing);

module.exports = {
  notFoundRoutes,
};
