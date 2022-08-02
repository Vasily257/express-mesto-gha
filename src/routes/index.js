const express = require('express');
const { userRoutes } = require('./userRoutes');
const { cardRoutes } = require('./cardRoutes');
const { notFoundRoutes } = require('./notFoundRoutes');

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);
routes.use('/*', notFoundRoutes);

module.exports = { routes };
