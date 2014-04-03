'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

// Clear old users, then add a default user
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'MakerSquare Student',
    email: 'test@test.com',
    password: 'test',
    currentPlaylist: "chill",
    chill: { genres: ["seapunk", "chillwave"],
      songs: [{url: 'http://soundcloud.com/freddykievskyi-1/ice-cube-gangsta-rap-made-me-do-it', playcount: 0, skip: false, liked: true },
      {url: 'http://soundcloud.com/clubcheval/rihanna-jump-club-cheval-rap', playcount: 0, skip: false, liked: false },
      {url: 'http://soundcloud.com/bigkrit/08-country-rap-tune', playcount: 0, skip: false, liked: true }],
      current: true
    }
  }, function() {
      console.log('finished populating users');
    }
  );
});
