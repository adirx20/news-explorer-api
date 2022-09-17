const User = require('../models/user');
const { AppError } = require('../errors/AppError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new AppError(404, 'No users found');
      }
      res.send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new AppError(404, 'No user found with that ID');
      } else {
        res.send({ user });
      }
    })
    .catch((err) => {
      next(err);
    });
};

const getUserById = (req, res, next) => {
  User.findOne({ _id: req.parmas.user._id })
    .then((user) => {
      if (!user) {
        throw new AppError(404, 'User ID not found');
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name } = req.body;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new AppError(404, 'User ID not found');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUsers,
  getCurrentUser,
  getUserById,
  updateProfile,
};