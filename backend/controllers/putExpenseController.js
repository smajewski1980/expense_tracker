const pool = require('../database/db_connect');
const { validationResult } = require('express-validator');

async function putExpenseController(req, res, next) {
  const vResult = validationResult(req);

  if (!vResult.isEmpty()) {
    return res.status(400).json(vResult.errors);
  }

  const expenseId = req.params.id;
  const currUser = req.session.user.user_email;
  const { date, expense_amount, account_paid_from, category, paid_to, notes } =
    req.body;

  try {
    const result = await pool.query(
      'UPDATE expenses SET user_email = $1, expense_date = $2, expense_amount = $3, account_paid_from = $4, category_id = $5, paid_to = $6, notes = $7 WHERE expense_id = $8',
      [
        currUser,
        date,
        expense_amount,
        account_paid_from,
        category,
        paid_to,
        notes,
        expenseId,
      ],
    );

    if (result.rowCount === 0) {
      return res.status(404).json('We could not find an expense with that id.');
    }

    return res.status(200).json('expense has been updated');
  } catch (error) {
    return next(new Error(error));
  }
}

module.exports = { putExpenseController };
