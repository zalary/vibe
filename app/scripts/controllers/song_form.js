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


<<<<<<< HEAD
    $scope.something = function () {
      $http({
        method: "POST",
        url: "/songs",
        data: { text: "Hello" }
      }).success(function(response) {
        console.log(response);
=======
    $scope.request = function () {
      $http.post('/songs', { text: "hello" } ).success(function(res) {
        console.log(res);
>>>>>>> 62ae010fd79d46a71b1366a60c4605501b91d3a9
      });
    }

    // $scope.request = function () {
    //   $http.get('/songs').success(function(data) {
    //     $scope.message = data;
    //   }).
    //   error(function(response) {
    //     console.log("WhoopS");
    //   })
    // };

  });
