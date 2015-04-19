angular.module('TestMaps', [])
  .controller('TestMapsController', [
    '$scope', function ($scope) {
      angular.element(document).ready(function () {
        $scope.selectedMarkers = [];
        $scope.markers = [];

        $scope.addMarker = function (marker) {
          var markerViewModel = new MarkerViewModel();
          markerViewModel.mapFromMapMarker(marker);
          $scope.markers.push(markerViewModel);
        };
      });
    }
  ]);