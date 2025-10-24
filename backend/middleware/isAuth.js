function isAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json('There is no one currently logged in.');
  }
  next();
}

module.exports = { isAuth };
