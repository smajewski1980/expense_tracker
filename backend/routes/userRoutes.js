const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/', (req, res, next) => {
  res.sendStatus(418);
});

// create a new user
router.post(
  '/',
  body('email').notEmpty().isEmail().escape(),
  body('password').notEmpty().isLength({ min: 5, max: 20 }).escape(),
  body('passwordConf').notEmpty().isLength({ min: 5, max: 20 }).escape(),
  (req, res, next) => {
    const result = validationResult(req);
    const { email, password, passwordConf } = req.body;

    if (password !== passwordConf) {
      result.errors.push({
        type: 'field',
        value: `${passwordConf}`,
        msg: 'Confirmation password does not match the password.',
        path: 'passwordConf',
        location: 'body',
      });
    }

    if (result.isEmpty()) {
      return res.sendStatus(200);
    }

    res.status(400).json(result.errors);
  },
);

module.exports = router;
