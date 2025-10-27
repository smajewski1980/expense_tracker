const pool = require('../database/db_connect');

async function deleteUserController(req, res, next) {
  const currUser = req.session.user.user_email;
  try {
    await pool.query('DELETE FROM users WHERE user_email = $1', [currUser]);
    return res.sendStatus(204);
  } catch (error) {
    next(new Error(error));
  }
}

module.exports = { deleteUserController };
