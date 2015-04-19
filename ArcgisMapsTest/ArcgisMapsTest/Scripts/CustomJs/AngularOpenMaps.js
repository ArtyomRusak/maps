$(function () {
  //var mapsController = new MapController();
  MapController.createMap("map", { lat: 0, lng: 0 }, "map", { zoomOnDoubleCheck: true });

  MapController.addListener("click", addMarkerByClickOnMap);

  pubsub.subscribe("addMarkerByClickOnMap", addMarkerByClickOnMapAngular);

  function addMarkerByClickOnMap(evt) {
    var marker = MapController.createMarker(evt.ll);
    pubsub.publish("addMarkerByClickOnMap", marker);
  };

  function addMarkerByClickOnMapAngular(topic, marker) {
    angular.element(document.getElementById("mainBody")).scope().addMarker(marker);
    angular.element(document.getElementById("mainBody")).scope().$apply();
  };
});