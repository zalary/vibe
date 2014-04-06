'use strict';

angular.module('vibeApp')
  .controller('MoodselectCtrl', function ($scope, $modal) {

  $scope.open = function () {
    var modalInstance = $modal.open({
      templateUrl: 'partials/mood.html',
      controller: 'MoodCtrl',
      keyboard: false,
      backdrop: 'static'
    });

    modalInstance.result.then(function(genre){
      $scope.message = genre;
    }, function(){
      console.log("Success");
    });
  }();


  });

