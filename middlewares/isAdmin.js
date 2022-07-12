
module.exports = isAdmin = (req, res, next) => {
  if (req.session.currentUser.role !== 'admin') {
    return res.render('auth/login', { error: 'Permissions Denied. Only Admins have access' });
  }
  next();
}