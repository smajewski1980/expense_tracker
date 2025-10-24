const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { isAuth } = require('../middleware/isAuth');
const {
  postExpenseController,
} = require('../controllers/postExpenseController');

router.post('/', isAuth, postExpenseController);

module.exports = router;
