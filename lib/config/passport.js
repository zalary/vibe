'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    TwitterStrategy  = require('passport-twitter').Strategy,
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

        consumerKey     : "tCzCUVQfofKtWGdkKA1wQ",
        consumerSecret  : "q8mIzHNKsoxgz7A3wVO2yri0dalXGh1RWV7Q2byG33E",
        callbackURL     : "/auth/twitter/callback"

    },
    function(token, tokenSecret, profile, done) {

      process.nextTick(function() {

          User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
              if (err)
                  return done(err);

              if (user) {
                  return done(null, user);
              } else {
                  var newUser                 = new User();

                  newUser.twitter.id          = profile.id;
                  newUser.twitter.token       = token;
                  newUser.twitter.username    = profile.username;
                  newUser.twitter.displayName = profile.displayName;

                  newUser.save(function(err) {
                      if (err)
                          throw err;
                      return done(null, newUser);
                  });
              }
          });

  });

}));




module.exports = passport;
