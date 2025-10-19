const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/', (req, res, next) => {
  res.sendStatus(418);
});

router.post('/', body('email').notEmpty().isEmail(), (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.sendStatus(200);
  }
  res.status(400).json(result.errors);
});

module.exports = router;
