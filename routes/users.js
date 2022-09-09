const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../middlewares/validateURL');
const {
  getUsers,
  getCurrentUser,
  getUserById,
  createUser,
  updateProfile,
  login,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);

router.get('/me', getCurrentUser);

// router.patch('/me', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//   }),
// }), updateProfile);

module.exports = router;