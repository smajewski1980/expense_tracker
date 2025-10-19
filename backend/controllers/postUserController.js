const { validationResult } = require('../node_modules/express-validator');
const pool = require('../database/db_connect');
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
      const result = await pool.query(
        'INSERT INTO users(user_email, password) VALUES($1, $2)RETURNING user_id',
        [email, password],
      );
      return res.status(201).send(result.rows[0].user_id);
    } catch (error) {
      return next(new Error(error));
    }
  }

  res.status(400).json(result.errors);
}

module.exports = postUserController;
