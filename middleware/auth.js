const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorizationerror');
const { UNAUTHORIZED } = require('../utils/httpstatuscodes');

const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthorizationError('No token found.', UNAUTHORIZED));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthorizationError('Invalid token.', UNAUTHORIZED));
  }
  req.user = payload;
  next();
};
