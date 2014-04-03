'use strict';

angular.module('vibeApp')
  .controller('MoodCtrl', function ($scope) {
    $scope.message = "Hello";

    $scope.moods = [
      { type: "Happy", icon: ":)" },
      { type: "Chill", icon: "B|" },
      { type: "Party", icon: "<:D" },
      { type: "Sad", icon: ":(" }
    ];
  });
