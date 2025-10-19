const { validationResult } = require('../node_modules/express-validator');
const pool = require('../database/db_connect');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
      ); // still a problem with the db entry having dbl quotes around it
      return res.status(201).send(poolRes.rows[0].user_id);
    } catch (error) {
      return next(new Error(error));
    }
  }

  res.status(400).json(result.errors);
}

module.exports = postUserController;
