const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { AppError } = require('../errors/AppError');

const { NODE_ENV, JWT_SECRET } = process.env;


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

// const createUser = (req, res, next) => {
//   const {
//     email,
//     password,
//     username,
//   } = req.body;

//   bcrypt
//     .hash(password, 10)
//     .then((hash) => {
//       return User.create({
//         email,
//         password: hash,
//         username,
//       });
//     })
//     .then((user) => {
//       res
//         .status(201)
//         .send({
//           email: user.email,
//           username: user.username,
//         });
//     })
//     .catch((err) => {
//       if (err.name === 'MongoServerError' || err.code === 11000) {
//         throw new AppError(409, 'Email already exist');
//       }
//       next(err);
//     });
// };

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

// const login = (req, res, next) => {
//   const { email, password } = req.body;

//   User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign(
//         { _id: user._id },
//         NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-string',
//         { expiresIn: '7d' },
//       );

//       if (!user) {
//         throw new AppError(401, 'Wrong email / password');
//       }

//       res.status(200).send({ user, token, message: 'successful' }); // need to edit the message
//     })
//     .catch((err) => {
//       console.log('login error: ', err);
//       next(err);
//     });
// };

module.exports = {
  getUsers,
  getCurrentUser,
  getUserById,
  updateProfile,
  // createUser,
  // login,
};