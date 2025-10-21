function getUserController(req, res, next) {
  try {
    const user_email = req.session.user.user_email;
    return res.status(200).json({ user_email });
  } catch (error) {
    const err = new Error('There is no one currently logged in.');
    err.status = 401;
    next(err);
  }
}

module.exports = getUserController;
