const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthorizationError = require('../errors/authorizationerror');
const CastError = require('../errors/casterror');
const ConflictError = require('../errors/conflicterror');
const NotFoundError = require('../errors/notfounderror');

const { JWT_SECRET } = require('../utils/config');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('User id not found.');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      email,
      password: hash,
    })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          console.log(err.message);
          next(new CastError('invalid data'));
        }
      })
      .then((user) => {
        if (!user) {
          throw new ConflictError('This email already exist');
        }
        return res.send({
          name: user.name,
          email: user.email,
          id: user._id,
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new CastError('invalid data'));
        }
        if (err.code === 11000) {
          next(new ConflictError('User already exists.'));
        } else next(err);
      });
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new AuthorizationError('Incorrect email or password.'))
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (!match) {
            throw new AuthorizationError('Incorrect email or password.');
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: '7d',
          });
          return res.send({ token, name: user.name });
        })
        .catch(next);
    })
    .catch(next);
};
