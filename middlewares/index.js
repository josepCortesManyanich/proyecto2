const User = require("../models/User");

module.exports = isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  next();
};

module.exports = isAdmin = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.render('/auth/login', {error:'Permissions Denied. Only Admins have access'});
  }
  next();
}
