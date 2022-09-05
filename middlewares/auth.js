const jwt = require('jsonwebtoken');
const { AppError } = require('../errors/AppError');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AppError(401, 'Authorization required!');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-string',
    );

    if (!payload) {
      throw new AppError(401, 'Authorization required!');
    }
  } catch (err) {
    next(err);
  }

  req.user = payload;

  next();
  return req.user;
};

module.exports = {
  auth,
};