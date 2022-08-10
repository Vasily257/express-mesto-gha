const express = require('express');

const process = require('process');

const mongoose = require('mongoose');

const { createUser, login } = require('./src/controllers/userControllers');
const { routes } = require('./src/routes/index');
const SERVER_ERROR_TEXT = require('./src/utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

// Add temp user
app.use((req, res, next) => {
  req.user = {
    _id: '62e79cd855fd2d842b7eaf5c',
  };

  next();
});

app.post('/signin', express.json(), login);
app.post('/signup', express.json(), createUser);

app.use(routes);

// Сentralized error handling

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(err.statusCode).send({
    message: statusCode === 500 ? SERVER_ERROR_TEXT : message,
  });
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
