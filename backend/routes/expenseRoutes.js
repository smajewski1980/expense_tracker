const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { isAuth } = require('../middleware/isAuth');
const {
  postExpenseController,
} = require('../controllers/postExpenseController');
const { getExpenseController } = require('../controllers/getExpenseController');
const {
  deleteExpenseController,
} = require('../controllers/deleteExpenseController');
const { putExpenseController } = require('../controllers/putExpenseController');

router.post(
  '/',
  isAuth,
  body('date')
    .notEmpty()
    .matches(/^\d{2}-\d{2}-\d{2}$/)
    .escape(),
  body('expense_amount').notEmpty().isFloat({ gt: 0 }).escape(),
  body('account_paid_from').notEmpty().isString().escape(),
  body('category').notEmpty().isNumeric().escape(),
  body('paid_to').notEmpty().isString().escape(),
  body('notes').escape(),
  postExpenseController,
);

router.get('/', isAuth, getExpenseController);

router.put(
  '/:id',
  isAuth,
  body('date')
    .notEmpty()
    .matches(/^\d{2}-\d{2}-\d{2}$/)
    .escape(),
  body('expense_amount').notEmpty().isFloat({ gt: 0 }).escape(),
  body('account_paid_from').notEmpty().isString().escape(),
  body('category').notEmpty().isNumeric().escape(),
  body('paid_to').notEmpty().isString().escape(),
  putExpenseController,
);

router.delete('/:id', isAuth, deleteExpenseController);

module.exports = router;
