const express = require('express');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const authRouter = require('./auth');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
// router.use('/', authRouter);
// router.use('/', authRouter);

module.exports = router;
