require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const { routes } = require('./src/routes/index');

const { logger, addTempUser } = require('./src/utils/utils');

const { PORT } = process.env;

const app = express();

app.use(logger);

app.use(addTempUser);

app.use(routes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  // eslint-disable-next-line no-console
  console.log('Connected to db');

  await app.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(PORT);
}

main();
