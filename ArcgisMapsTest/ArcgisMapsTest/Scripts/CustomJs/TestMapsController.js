﻿angular.module('TestMaps', []).controller('TestMapsController', [
  '$scope', function($scope) {
    angular.element(document).ready(function() {
      $scope.selectedPoints = [];
      $scope.points = [];
    });
  }
]);