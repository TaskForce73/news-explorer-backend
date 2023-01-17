const router = require('express').Router();
const auth = require('../middleware/auth');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const nonExistRoute = require('./nonexist');
const { createUser, login } = require('../controllers/users');
const {
  loginValidation,
  registerValidation,
} = require('../middleware/validation');

router.post('/signup', registerValidation, createUser);
router.post('/signin', loginValidation, login);

router.use('/users', auth, usersRouter);
router.use('/', articlesRouter);
router.use('*', nonExistRoute);

module.exports = router;
