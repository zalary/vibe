'use strict';

angular.module('vibeApp')
  .controller('SongFormCtrl', function ($scope, $http, $location) {

    $scope.genre = {
        type: "",
        user_moods: []
    };

    $scope.counter = 0;

    $scope.show_button = true;

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
          $scope.moods[i].valid = false;
        }
      }
      $scope.counter++
      $scope.finish();
    };

    $scope.switchView = function () {
      $location.path('/');
    }

    $scope.request = function () {
      $http.post('/songs', { text: "hello" } ).success(function(res) {
        console.log(res);
      });
    };

    $scope.finish = function () {
      if ($scope.counter > 2) {
        $scope.show_button = false;
      }
    }


  });
