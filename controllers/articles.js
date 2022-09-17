const Article = require('../models/article');
const { AppError } = require('../errors/AppError');

const getArticles = (req, res, next) => {
  Article.find({})
    .select('+owner')
    .then((articles) => {
      const ownedArticles = articles.filter((item) => item.owner === req.user._id);
      res.status(200).send(ownedArticles);
    })
    .catch((err) => {
      next(err);
    });
};

const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  const owner = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => {
      res.status(201).send(article);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params.articleId;

  Article.findOne({ _id: articleId })
    .select('+owner')
    .then((article) => {
      if (!article) {
        throw new AppError(404, 'Article ID not found');
      }
      if (article.owner.toString() !== req.user._id) {
        throw new AppError(403, 'You dont have permission to delete this article');
      }
      return Article.findOneAndDelete(articleId)
        .then((deletedArticle) => {
          const {
            keyword,
            date,
            text,
            title,
            source,
            link,
            image,
          } = deletedArticle;

          res
            .status(200)
            .send({
              keyword,
              date,
              text,
              title,
              source,
              link,
              image,
            });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};