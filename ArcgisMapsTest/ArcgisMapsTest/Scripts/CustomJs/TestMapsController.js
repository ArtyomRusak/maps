angular.module('TestMaps', [])
  .controller('TestMapsController', [
    '$scope', function ($scope) {
      angular.element(document).ready(function () {
        MapController.addListener("click", addMarkerByClickOnMap);

        $scope.selectedMarkers = [];
        $scope.markers = [];

        $scope.addMarker = function (marker) {
          var markerViewModel = new MarkerViewModel(marker);
          $scope.markers.push(markerViewModel);
        };

        $scope.makeDraggable = function (marker) {
          MapController.setDraggableToMarker(marker.markerId, marker.draggable);
        };

        $scope.makeSelected = function (marker) {
          MapController.setSelectedForMarker(marker.markerId, marker.selected);
          if (marker.selected) {
            $scope.selectedMarkers.push(marker);
          } else {
            $scope.selectedMarkers.splice($scope.selectedMarkers.indexOf(marker), 1);
          }
        }

        $scope.clickBtn = function () {
          $scope.markers.push({ latLng: { lat: 12, lng: 53 }, draggable: true });
        }

        function addMarkerByClickOnMap(evt) {
          var marker = MapController.createMarker(evt.ll);
          $scope.addMarker(marker);
          applyScope();
        }

        function applyScope() {
          $scope.$apply();
        }
      });
    }
  ]);