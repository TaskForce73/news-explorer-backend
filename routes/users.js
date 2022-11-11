const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middleware/auth');
const { createUser, login, getUser } = require('../controllers/users');

router.get('/users/me', auth, getUser);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2).max(30),
      name: Joi.string().min(2).max(30),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

module.exports = router;
