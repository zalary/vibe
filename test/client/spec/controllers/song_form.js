'use strict';

describe('Controller: SongFormCtrl', function () {

  // load the controller's module
  beforeEach(module('vibeApp'));

  var SongFormCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SongFormCtrl = $controller('SongFormCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
