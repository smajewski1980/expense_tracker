function getUserController(req, res, next) {
  try {
    const user_email = req.session.user.user_email;
    return res.sendStatus(200);
  } catch (error) {
    const err = new Error('There is no one currently logged in.');
    err.status = 401;
    next(err);
  }
}

module.exports = getUserController;
