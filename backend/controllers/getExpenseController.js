const pool = require('../database/db_connect');

async function getExpenseController(req, res, next) {
  const currUser = req.session.user.user_email;
  try {
    const result = await pool.query(
      'SELECT * FROM expenses WHERE user_email = $1 ORDER BY expense_id DESC',
      [currUser],
    );

    if (!result.rowCount) {
      return res.status(200).json('Start by entering an expense.');
    }

    return res.status(200).json(result.rows);
  } catch (error) {
    return next(new Error(error));
  }
}

module.exports = { getExpenseController };
