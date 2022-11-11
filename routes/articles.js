const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const auth = require('../middleware/auth');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

const validateLink = (value, helpers) => (validator.isURL(value) ? value : helpers.error('string.uri'));

router.get('/articles', auth, getArticles);

router.post(
  '/articles',
  auth,
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().custom(validateLink),
      image: Joi.string().required().custom(validateLink),
    }),
  }),
  createArticle,
);

router.delete(
  '/articles/:articleId',
  auth,
  celebrate({
    params: Joi.object()
      .keys({
        articleId: Joi.string().hex().length(24),
      })
      .unknown(true),
  }),
  deleteArticle,
);

module.exports = router;
