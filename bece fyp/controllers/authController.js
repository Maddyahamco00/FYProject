const passport = require('passport');
const bcrypt = require('bcryptjs');

module.exports = {
  loginPage: (req, res) => {
    res.render('auth/login', { title: 'Login' });
  },

  loginHandle: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('auth/login', {
        title: 'Login',
        errors: errors.array()
      });
    }

    passport.authenticate('local', {
      successRedirect: '/admin/dashboard',
      failureRedirect: '/auth/login',
      failureFlash: true
    })(req, res, next);
  },

  logoutHandle: (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
  }
};