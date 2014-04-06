'use strict';

describe('Controller: MoodselectCtrl', function () {

  // load the controller's module
  beforeEach(module('vibeApp'));

  var MoodselectCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MoodselectCtrl = $controller('MoodselectCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
