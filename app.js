require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const path = require('path');

const { routes } = require('./src/routes/index');

const { PORT } = process.env;

const app = express();

const PUBLIC_FOLDER = path.join(__dirname, 'public');

app.use(express.static(PUBLIC_FOLDER));

const logger = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`${req.method}: ${req.path}`);
  // eslint-disable-next-line no-console
  console.log('Запрос залогирован!');
  next();
};

app.use(logger);

app.use('/', routes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  // eslint-disable-next-line no-console
  console.log('Connected to db');

  await app.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(PORT);
}

main();
