'use strict';

angular.module('vibeApp')
  .controller('SongFormCtrl', function ($scope, $http, $location) {

    $scope.genre = {
        type: "",
        user_moods: []
    };

    $scope.counter = 0;

    $scope.show_button = false;

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
      // $http({method:"get", url: "http://www.google.com"})
      //   .success(function(data){console.log(data);})
      $http({ method: 'POST', url: '/sample'}).
        success(function(data,status, headers, config){
          console.log(data);
        }).
        error(function(data,status,headers,config){
          console.log("This is not good");
        });
    };



    $scope.finish = function () {
      if ($scope.counter > 2) {
        $scope.show_button = true;
      }
    }


  });
