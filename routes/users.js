const express = require('express');
// const { celebrate, Joi } = require('celebrate');
// const { validateURL } = require('../middlewares/validateURL');
const {
  getUsers,
  getCurrentUser,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);

router.get('/me', getCurrentUser);

module.exports = router;