const router = require('express').Router();
const auth = require('../middleware/auth');
const { getUser } = require('../controllers/users');

router.get('/users/me', auth, getUser);

module.exports = router;
