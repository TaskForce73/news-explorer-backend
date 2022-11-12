const router = require('express').Router();
const NotFoundError = require('../errors/notfounderror');

router.all('*', (req, res, next) => {
  next(new NotFoundError('Requested resourece was not found.'));
});

module.exports = router;
