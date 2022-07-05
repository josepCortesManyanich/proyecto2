const User = require("../models/User");

module.exports = isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  next();
};

module.exports = isAdmin = (req, res, next) => {
  console.log(req.session.currentUser)
  if (req.session.currentUser.role !== 'admin') {
    // req.toast.error('Only admins can perform this action')
    return res.render('auth/login', {error:'Permissions Denied. Only Admins have access'});
  }
  next();
}
