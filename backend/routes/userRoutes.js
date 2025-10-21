const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  postUserController,
  postUserLoginController,
} = require('../controllers/postUserController');

// create a new user
router.post(
  '/',
  body('email').notEmpty().isEmail().escape(),
  body('password').notEmpty().isLength({ min: 5, max: 20 }).escape(),
  body('passwordConf').notEmpty().isLength({ min: 5, max: 20 }).escape(),
  postUserController,
);

// login a user
router.post(
  '/login',
  body('email').notEmpty().isEmail().escape(),
  body('password').notEmpty().isLength({ min: 5, max: 20 }).escape(),
  postUserLoginController,
);

module.exports = router;
