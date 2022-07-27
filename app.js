require('dotenv').config();

const express = require('express');
const path = require('path');
const { routes } = require('./src/routes/index');

const { PORT } = process.env;

const app = express();

const PUBLIC_FOLDER = path.join(__dirname, 'public');

app.use(express.static(PUBLIC_FOLDER));

const logger = (req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  console.log('Запрос залогирован!');
  next();
};

app.use(logger);

app.use('/', routes);

app.listen(PORT);
