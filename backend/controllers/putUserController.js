const { validationResult } = require('../node_modules/express-validator');
const pool = require('../database/db_connect');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function putUserController(req, res, next) {
  const result = validationResult(req);
  const { oldPassword, password, passwordConf } = req.body;
  const currUser = req.session.user.user_email;

  // need to check if the old password is correct
  try {
    const res = await pool.query(
      'select password from users where user_email = $1',
      [currUser],
    );
    const passwordHash = res.rows[0].password;
    const match = await bcrypt.compare(oldPassword, passwordHash);
    if (!match) {
      result.errors.push({
        type: 'field',
        value: `${oldPassword}`,
        msg: 'Old password was incorrect, please try again',
        path: 'oldPassword',
        location: 'body',
      });
    }
  } catch (error) {
    return next(new Error(error));
  }

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
        'UPDATE users SET password = $1 where user_email = $2',
        [hashedPw, currUser],
      );
      return res.status(200).json('User info has been updated.');
    } catch (error) {
      return next(new Error(error));
    }
  }

  return res.status(400).json(result.errors);
}

module.exports = { putUserController };
