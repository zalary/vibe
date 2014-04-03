'use strict';

describe('Controller: MoodCtrl', function () {

  // load the controller's module
  beforeEach(module('vibeApp'));

  var MoodCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MoodCtrl = $controller('MoodCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
