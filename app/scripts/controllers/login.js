'use strict';

angular.module('vibeApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    
    //remove for production
    $scope.user = {email: "test@test.com", password: "test"};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;
      
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors.other = err.message;
        });
      }
    };
  });