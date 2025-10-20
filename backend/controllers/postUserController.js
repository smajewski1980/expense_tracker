const { validationResult } = require('../node_modules/express-validator');
const pool = require('../database/db_connect');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const session = require('express-session');

async function postUserController(req, res, next) {
  const result = validationResult(req);
  const { email, password, passwordConf } = req.body;

  if (password !== passwordConf) {
    result.errors.push({
      type: 'field',
      value: `${passwordConf}`,
      msg: 'Confirmation password does not match the password.',
      path: 'passwordConf',
      location: 'body',
    });
  }

  if (result.isEmpty()) {
    try {
      const hashedPw = await bcrypt.hash(password, saltRounds);
      const poolRes = await pool.query(
        'INSERT INTO users(user_email, password) VALUES($1, $2) RETURNING user_id',
        [email, hashedPw],
      );
      return res.status(201).send(poolRes.rows[0].user_id);
    } catch (error) {
      return next(new Error(error));
    }
  }

  res.status(400).json(result.errors);
}

async function postUserLoginController(req, res, next) {
  const result = validationResult(req);
  const { email, password } = req.body;

  if (result.isEmpty()) {
    try {
      const poolRes = await pool.query(
        'SELECT * FROM USERS WHERE user_email = $1',
        [email],
      );

      if (!poolRes.rowCount) {
        const error = new Error('We could not find a user with that username.');
        error.status = 404;
        return next(error);
      }

      const correctPw = poolRes.rows[0].password;
      const matchedPw = await bcrypt.compare(password, correctPw);

      if (matchedPw) {
        req.session.user = { user_email: poolRes.rows[0].user_email };
        return res.sendStatus(200);
      }
    } catch (error) {
      return next(new Error(error));
    }
  }

  res.status(400).json(result.errors);
}

module.exports = { postUserController, postUserLoginController };
