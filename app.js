const express = require('express');
const morgan = require('morgan');

const destinationRouter = require('./routes/destinationRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/destinations', destinationRouter);

module.exports = app;
