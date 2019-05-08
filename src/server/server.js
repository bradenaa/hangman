/* eslint-disable no-path-concat */
require('dotenv').config();
const { PORT } = process.env;

const express = require('express');

const app = express();

const cors = require('cors');

const path = require('path');
const logger = require('morgan');

app.use(cors());
app.use(logger('dev'));


app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get('/', (req, res) => {
  console.log('serving index.html from ', __dirname);
  res.status(200).sendFile(path.join(__dirname, '../../index.html'));
});

// USE THIS IN PRODUCTION
app.listen(PORT, (err) => {
  console.log(`Listing on port: ${PORT}`);
});
