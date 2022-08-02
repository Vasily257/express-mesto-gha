require('dotenv').config();

const express = require('express');

const process = require('process');

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
  await app.listen(PORT);
}

main();

process.on('uncaughtException', (err, origin) => {
  // eslint-disable-next-line no-console
  console.log(
    `${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`
  );
});
