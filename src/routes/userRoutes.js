const express = require('express');
const { getUsers } = require('../controllers/userControllers');
const { getUserById } = require('../controllers/userControllers');
const { createUser } = require('../controllers/userControllers');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/', express.json(), createUser);

module.exports = {
  userRoutes,
};
