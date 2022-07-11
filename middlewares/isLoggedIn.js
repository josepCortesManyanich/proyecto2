module.exports = isLoggedIn = (req, res, next) => {
  console.log('middleware in')
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  next();
}
