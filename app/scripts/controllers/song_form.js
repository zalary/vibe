'use strict';

angular.module('vibeApp')
  .controller('SongFormCtrl', function ($scope, $http) {

    $scope.genre = {
        type: "",
        user_moods: []
    };

    $scope.moods = [
      { option: "Happy", valid: false },
      { option: "Party", valid: false },
      { option: "Sad", valid: false },
      { option: "Angry", valid: false },
    ];

    $scope.setMood = function () {
      for (var i = 0; i < $scope.moods.length; i++) {
        if ($scope.moods[i].valid) {
          $scope.genre.user_moods.push($scope.moods[i].option)
          // $scope.moods[i].valid = false;
        }
      }
    };


    $scope.request = function () {
      $http.post('/songs', { text: "hello" } ).success(function(response) {
        console.log(response);
      });
    };


  });
