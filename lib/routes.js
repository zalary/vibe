'use strict';

var index = require('./controllers'),
    users = require('./controllers/users'),
    passport = require('passport'),
    session = require('./controllers/session');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes

  app.post('/api/users', users.create);
  // app.get('api/users');

  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.post('/api/users/me', users.updatePlaylist);
  app.get('/api/users/:id', users.show);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  app.get('/moods/:mood', users.checkPlaylist);
  app.post('/moods/genre', users.addGenre);

  app.get('/auth/twitter', passport.authenticate('twitter'));
  // app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }

  app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/api/users/1' }));

  app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/',
                    failureRedirect : '/'
            }));


  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};
