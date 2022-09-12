const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { centralErrorHandler } = require('./middlewares/centralErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { AppError } = require('./errors/AppError');
const { auth } = require('./middlewares/auth');
const limiter = require('./middlewares/limiter');

require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

// define users and articles routes
// const usersRouter = require('./routes/users');
// const articlesRouter = require('./routes/articles');
const authRouter = require('./routes/auth');
const appRouter = require('./routes/index');

// connect mongodb
mongoose.connect('mongodb://localhost:27017/news-api');
// mongoose.connect('mongodb://35.199.171.220:27017/news-api');

// use cors and options cors
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(limiter);
app.use(requestLogger);

// use routes for users and articles
// app.use('/users', usersRouter);
// app.use('/articles', articlesRouter);
app.use('/', authRouter);
app.use('/', authRouter);
app.use(auth);

app.use(appRouter);

app.use('/', (req, res) => {
  throw new AppError(404, 'Requested resource was not found');
});

app.use(errorLogger);

app.use((err, req, res, next) => {
  centralErrorHandler(err, res);
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});