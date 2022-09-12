const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { AppError } = require('../errors/AppError');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        email,
        password: hash,
        name,
      });
    })
    .then((user) => {
      res
        .status(201)
        .send({
          email: user.email,
          name: user.name,
        });
    })
    .catch((err) => {
      if (err.name === 'MongoServerError' || err.code === 11000) {
        res.status(409).send({ message: 'Email already exist' });
        throw new AppError(409, 'Email already exist');
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-string',
        { expiresIn: '7d' },
      );

      if (!user) {
        throw new AppError(401, 'Wrong email / password');
      }

      res.status(200).send({ token, message: 'Logged in successfully' }); // need to edit the message
    })
    .catch((err) => {
      console.log('login error: ', err);
      next(err);
    });
};

module.exports = {
  createUser,
  login,
};