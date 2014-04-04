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
      // $scope.userMood = mood;
      $http.get('/moods/' + mood)
        .success(function(data){
          console.log(data);
          $scope.select = "genre";
        })
        .error(function(data) {
          alert("Sorry, your vibe can't be processed at this time");
        })
    }

    $scope.chooseMood = function () {
      $scope.select = "form";
    }

    $scope.setPlayer = function (genre) {
      $location.path('/main');
      // $http.put('/api/users/new/genre', { genre: genre } )
      //   .success(function(data){
      //     console.log(data);
      //   })
      //   .error(function(data){
      //     window.alert("Sorry, could not process your request at this moment. Please try again momentarily");
      //   });
    }

  });
