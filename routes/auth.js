const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../middlewares/validateURL');
const {
  createUser,
  login,
} = require('../controllers/auth');

const router = express.Router();

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom(validateURL),
    password: Joi.string().required().custom(validateURL),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateURL),
    password: Joi.string().required().custom(validateURL),
  }),
}), login);

module.exports = router;