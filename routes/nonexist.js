const router = require('express').Router();
const auth = require('../middleware/auth');
const NotFoundError = require('../errors/notfounderror');

router.all('*', auth, (req, res, next) => {
  next(new NotFoundError('Requested resourece was not found.'));
});

module.exports = router;
