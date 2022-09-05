const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { AppError } = require('../errors/AppError');

const { NODE_ENV, JWT_SECRET } = process.env;

// User.find({})
// .then((users) => {
//   res.send(users);
// })
// .catch((err) => {
//   next(err);
// });

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new AppError(404, 'No user found with that ID');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// User.findOne({ _id: req.parmas.user._id })
// .then((user) => {
//   if (!user) {
//     throw new AppError(404, 'User ID not found');
//   } else {
//     res.send(user);
//   }
// })
// .catch((err) => {
//   next(err);
// });

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.user_id });

    if (!user) {
      throw new AppError(404, 'User ID not found');
    } else {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    username,
  } = req.body;

  bcrypt
  .hash(password, 10)
  .then((hash) => {
    return User.create({
      email,
      password: hash,
      username,
    });
  })
  .then((user) => {
    res
    .status(201)
    .send({
      email: user.email,
      username: user.username,
    });
  })
  .catch((err) => {
    if (err.name === 'MongoServerError' || err.code === 11000) {
      throw new AppError(409, 'Email already exist');
    }
    next(err);
  });
};