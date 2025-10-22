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

function getUserLogoutController(req, res, next) {
  if (!req.session.user) {
    return res.sendStatus(401);
  }
  req.session.destroy((err) => {
    if (!err) {
      res.clearCookie('connect.sid');
      return res.status(200).json('The user is now logged out.');
    }

    return next(err);
  });
}

module.exports = { getUserController, getUserLogoutController };
