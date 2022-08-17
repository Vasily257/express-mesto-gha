const express = require('express');

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/userControllers');

const { validateId, validateUserInfo, validateUserAvatar } = require('../middlewares/validate-requests');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/me', getCurrentUser);
userRoutes.get('/:id', validateId, getUserById);
userRoutes.patch('/me', [express.json(), validateUserInfo], updateProfile);
userRoutes.patch('/me/avatar', [express.json(), validateUserAvatar], updateAvatar);

module.exports = { userRoutes };
