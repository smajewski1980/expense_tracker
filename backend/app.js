const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/user', userRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.status || 500)
    .json(err.message || 'Something went wrong on our end, please try again.');
});

module.exports = app;
