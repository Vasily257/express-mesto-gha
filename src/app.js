require('dotenv').config();

const express = require('express');
const path = require('path');

const { PORT } = process.env;

const app = express();

const PUBLIC_FOLDER = path.join(__dirname, 'public');

app.use(express.static(PUBLIC_FOLDER));

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  next();
});

app.listen(PORT);
