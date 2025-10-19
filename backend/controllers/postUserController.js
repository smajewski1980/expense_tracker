const { validationResult } = require('../node_modules/express-validator');
function postUserController(req, res, next) {
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
}

module.exports = postUserController;
