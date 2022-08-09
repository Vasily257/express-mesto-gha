const express = require('express');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/userControllers');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.patch('/me', express.json(), updateProfile);
userRoutes.patch('/me/avatar', express.json(), updateAvatar);

module.exports = {
  userRoutes,
};
