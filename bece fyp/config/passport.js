const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../models/db');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
      try {
        const user = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        
        if (!user.length) {
          return done(null, false, { message: 'Username not found' });
        }

        const isMatch = await bcrypt.compare(password, user[0].password_hash);
        if (isMatch) {
          return done(null, user[0]);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);
      done(null, user[0]);
    } catch (err) {
      done(err, null);
    }
  });
};
