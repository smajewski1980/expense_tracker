const { validationResult } = require('../node_modules/express-validator');
const pool = require('../database/db_connect');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function putUserController(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json('There is no one currently logged in.');
  }

  const result = validationResult(req);
  const { email, password, passwordConf } = req.body;
  const currUser = req.session.user.user_email;

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
      const result = await pool.query(
        'UPDATE users SET user_email = $1, password = $2 where user_email = $3',
        [email, hashedPw, currUser],
      );
      return res.status(200).json('User info has been updated.');
    } catch (error) {
      return next(new Error(error));
    }
  }

  return res.status(400).json(result.errors);
}

module.exports = { putUserController };
