const express = require('express');

const process = require('process');

const mongoose = require('mongoose');

const { createUser, login } = require('./src/controllers/userControllers');
const { routes } = require('./src/routes/index');

const { PORT = 3000 } = process.env;

const app = express();

// Add temp user
app.use((req, res, next) => {
  req.user = {
    _id: '62e79cd855fd2d842b7eaf5c',
  };

  next();
});

app.post('/signin', login);
app.post('/signup', express.json(), createUser);

app.use(routes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  await app.listen(PORT);
}

main();

process.on('uncaughtException', (err, origin) => {
  // eslint-disable-next-line no-console
  console.log(
    `${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`,
  );
});
