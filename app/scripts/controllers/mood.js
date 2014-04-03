'use strict';

angular.module('vibeApp')
  .controller('MoodCtrl', function ($scope, $location, $http) {

    var user = {
      mood: $scope.userMood,
      genre: $scope.userGenre
    };

    $scope.select = "form";

    $scope.userMood = "";
    $scope.userGenre = "";

    $scope.moods = [
      { type: "Happy", icon: ":)" },
      { type: "Chill", icon: "B|" },
      { type: "Party", icon: "<:D" },
      { type: "Sad", icon: ":(" }
    ];

    $scope.setMood = function (mood) {
      $scope.userMood = mood;
      $scope.select = "genre";
    }

    $scope.chooseMood = function () {
      $scope.select = "form";
    }

    $scope.setPlayer = function () {
      $location.path('/main');
      $http.post('/api/users/me', user)
        .success(function(data){
          console.log("Posted new user info");
        });
    }

  });
