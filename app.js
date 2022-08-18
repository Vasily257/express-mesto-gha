require('dotenv').config();

const express = require('express');

const process = require('process');

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const { createUser, login } = require('./src/controllers/userControllers');

const auth = require('./src/middlewares/auth');
const { validateUserData } = require('./src/middlewares/validate-requests');

const { routes } = require('./src/routes/index');
const { SERVER_ERROR_TEXT, INTERNAL_SERVER_ERROR_STATUS } = require('./src/utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.post('/signin', [express.json(), validateUserData], login);
app.post('/signup', [express.json(), validateUserData], createUser);

app.use(auth);

app.use(routes);

// Error validation

app.use(errors());

// Сentralized error handling

app.use((err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR_STATUS, message } = err;

  res.status(statusCode).send({
    message: statusCode === INTERNAL_SERVER_ERROR_STATUS ? SERVER_ERROR_TEXT : message,
  });

  next();
});

// Starting the app

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  await app.listen(PORT);
}

main();

// Global error handler

process.on('uncaughtException', (err, origin) => {
  // eslint-disable-next-line no-console
  console.log(
    `${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`,
  );
});
