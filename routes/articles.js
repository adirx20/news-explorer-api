const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../middlewares/validateURL');

const router = express.Router();

// router.get('/', getArticles);

// router.post('/', celebrate({
//   body: Joi.object().keys({
//     keyword: Joi.string().required(),
//     title: Joi.string().required(),
//     text: Joi.string().required(),
//     date: Joi.string().required(),
//     source: Joi.string().required(),
//     link: Joi.string().required(),
//     image: Joi.string().required(),
//   }),
// }), createArticle);

// router.get('/:articleId', selectedArticle);

// router.delete('/:articleId', celebrate({
//   params: Joi.object().keys({
//     articleId: Joi.string().hex().length(24)
//   }),
// }), deleteArticle);

module.exports = router;