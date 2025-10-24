const { validationResult } = require('../node_modules/express-validator');
const pool = require('../database/db_connect');

async function postExpenseController(req, res, next) {
  const vResult = validationResult(req);
  const { date, expense_amount, account_paid_from, category, paid_to, notes } =
    req.body;
  const currUser = req.session.user.user_email;

  if (vResult.isEmpty()) {
    try {
      const result = await pool.query(
        'INSERT INTO expenses(user_email, expense_date, expense_amount, account_paid_from, category_id, paid_to, notes) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING expense_id',
        [
          currUser,
          date,
          expense_amount,
          account_paid_from,
          category,
          paid_to,
          notes,
        ],
      );
      return res.status(201).json(result.rows[0].expense_id);
    } catch (error) {
      next(new Error(error));
    }
  }
  return res.status(400).json(vResult.errors);
}

module.exports = { postExpenseController };
