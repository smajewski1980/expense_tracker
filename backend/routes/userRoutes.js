const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const postUserController = require('../controllers/postUserController');

router.get('/', (req, res, next) => {
  res.sendStatus(418);
});

// create a new user
router.post(
  '/',
  body('email').notEmpty().isEmail().escape(),
  body('password').notEmpty().isLength({ min: 5, max: 20 }).escape(),
  body('passwordConf').notEmpty().isLength({ min: 5, max: 20 }).escape(),
  postUserController,
);

module.exports = router;
