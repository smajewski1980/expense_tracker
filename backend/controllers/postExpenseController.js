const { validationResult } = require('../node_modules/express-validator');
const pool = require('../database/db_connect');

function postExpenseController(req, res, next) {
  return res.sendStatus(418);
}

module.exports = { postExpenseController };
