'use strict';

// var users  = require('./controllers/users');

angular.module('vibeApp')
  .controller('MoodCtrl', function ($scope, $location, $http, User, Auth) {

    $scope.select = "form";

    $scope.userMood = "";
    $scope.userGenre = "";

    $scope.findAuth = function () {
      var x = Auth.currentUser();
      console.log(x);
    }

    $scope.moods = [
      { type: "happy", icon: ":)" },
      { type: "chill", icon: "B|" },
      { type: "party", icon: "<:D" },
      { type: "sad", icon: ":(" }
    ];

    $scope.setMood = function (mood) {
      $scope.userMood = mood;
      $scope.select = "genre";
    }

    $scope.chooseMood = function () {
      $scope.select = "form";
    }

    $scope.setPlayer = function (mood, genre) {
      $http.put('/api/users/me', { mood: mood, genre: genre} )
        .success(function(data){
          $location.path('/main');
        })
        .error(function(data){
          window.alert("Sorry, could not process your request at this moment. Please try again momentarily");
        });
    }

  });
