'use strict';

// var users  = require('./controllers/users');

angular.module('vibeApp')
  .controller('MoodCtrl', function ($scope, $location, $http, User) {

    $scope.select = "form";

    $scope.userMood = "";
    $scope.userGenre = "";

    $scope.moods = [
      { type: "happy", icon: ":)" },
      { type: "chill", icon: "B|" },
      { type: "party", icon: "<:D" },
      { type: "sad", icon: ":(" }
    ];

    $scope.me = User.id;

    $scope.setMood = function (mood) {
      $scope.userMood = mood;
      $http.get('/moods/' + mood)
        .success(function (data) {
          if (!data) {
            $scope.select = "genre";
          }
          else {
            $location.path('/main/' + mood);
          }
        })
        .error(function (data) {
          window.alert("Sorry, your vibe can't be processed at this time");
        });
    };

    $scope.chooseMood = function () {
      $scope.select = "form";
    };

    $scope.setPlayer = function (mood, genre) {
      $http.post('/moods/genre', { genre: genre, mood: mood })
        .success(function (data) {
          $location.path('/main/' + mood);
        })
        .error(function (data) {
          window.alert("Sorry, your vibe can't be processed at this time");
        })
    };

  });
