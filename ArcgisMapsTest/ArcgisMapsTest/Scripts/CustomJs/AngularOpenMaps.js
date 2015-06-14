$(function () {
  //var mapsController = new MapController();
  MapController.createMap("map", { lat: 0, lng: 0 }, "map", { zoomOnDoubleCheck: true });
  
  //pubsub.subscribe("addMarkerByClickOnMap", addMarkerByClickOnMapAngular);

  //function addMarkerByClickOnMap(evt) {
  //  //var marker = MapController.createMarker(evt.ll);
  //  //pubsub.publish("addMarkerByClickOnMap", marker);
  //  var marker = MapController.createMarker(evt.ll);
  //};

  //function addMarkerByClickOnMapAngular(topic, marker) {
  //  var scope = angular.element(document.getElementById("mainBody")).scope();
  //  scope.addMarker(marker);
  //  scope.$apply();
  //};
});