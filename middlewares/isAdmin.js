
module.exports = isAdmin = (req, res, next) => {
  console.log('middleware');
  console.log(req.session.currentUser)
  if (req.session.currentUser.role !== 'admin') {
    return res.render('auth/login', { error: 'Permissions Denied. Only Admins have access' });
  }
  next();
}