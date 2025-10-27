const pool = require('../database/db_connect');

async function deleteExpenseController(req, res, next) {
  const expenseToDelete = req.params.id;

  try {
    const result = await pool.query(
      'DELETE FROM expenses WHERE expense_id = $1',
      [expenseToDelete],
    );

    if (!result.rowCount) {
      return res.status(404).json('We could not find an expense with that id.');
    }

    return res.sendStatus(204);
  } catch (error) {
    return next(new Error(error));
  }
}

module.exports = { deleteExpenseController };
