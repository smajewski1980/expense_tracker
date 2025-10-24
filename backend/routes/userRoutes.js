const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  postUserController,
  postUserLoginController,
} = require('../controllers/postUserController');
const {
  getUserController,
  getUserLogoutController,
} = require('../controllers/getUserController');
const { putUserController } = require('../controllers/putUserController');
const { deleteUserController } = require('../controllers/deleteUserController');
const { isAuth } = require('../middleware/isAuth');

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

// get user info
router.get('/', getUserController);
// logout user
router.get('/logout', isAuth, getUserLogoutController);

// update user data
router.put(
  '/',
  isAuth,
  body('email').notEmpty().isEmail().escape(),
  body('password').notEmpty().isLength({ min: 5, max: 20 }).escape(),
  body('passwordConf').notEmpty().isLength({ min: 5, max: 20 }).escape(),
  putUserController,
);

// delete a user
router.delete('/', isAuth, deleteUserController);

module.exports = router;
