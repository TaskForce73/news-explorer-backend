const { celebrate, Joi } = require('celebrate');

const registerValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const articlesValidation = celebrate({
  body: Joi.object().keys({
    question: Joi.string().required(),
    fromDate: Joi.string().required(),
  }),
});

const articleIdValidation = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  registerValidation,
  loginValidation,
  articlesValidation,
  articleIdValidation,
};
