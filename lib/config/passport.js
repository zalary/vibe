'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    LocalStrategy = require('passport-local').Strategy;

/**
 * Passport configuration
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findOne({
    _id: id
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    done(err, user);
  });
});

// add other strategies for more authentication flexibility
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function(email, password, done) {
    User.findOne({
      email: email
    }, function(err, user) {
      if (err) return done(err);

      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'This password is not correct.'
        });
      }
      return done(null, user);
    });
  }
));

passport.use(new TwitterStrategy({
    consumerKey: "mklpSg5SkRJCBHBqgUyTQ",
    consumerSecret: "YmgrTO5qZYnlfSgeDUMuFiAI4uAi9k7YGse3iFuzpo",
    callbackURL: "http://www.something.com/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ twitterId: profile.id }, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));


module.exports = passport;
