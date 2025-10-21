const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(
  session({
    secret: 'unicorn_princess',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 5e6 },
  }),
);

app.use(bodyParser.json());
app.use('/user', userRoutes);

app.get('/errortest', (req, res, next) => {
  return next(new Error());
});

app.use((err, req, res, next) => {
  // console.log(err);
  res
    .status(err.status || 500)
    .json(err.message || 'Something went wrong on our end, please try again.');
});

module.exports = app;
