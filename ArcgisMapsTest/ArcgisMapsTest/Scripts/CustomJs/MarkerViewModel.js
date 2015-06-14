function MarkerViewModel(marker) {
  var thisObject = this;

  if (marker !== undefined && marker !== null) {
    this.constructor(marker);
  } else {
    this.draggable = false;
    this.markerId = "";
    this.selected = false;
    this.latLng = {};
  }

  this.mapFromMapMarker = function (mapMarkerObject) {
    thisObject.draggable = mapMarkerObject.draggable;
    thisObject.markerId = mapMarkerObject["$mqa.id$"];
    thisObject.selected = false;
    thisObject.latLng = mapMarkerObject.latLng;
  };
}

MarkerViewModel.prototype.constructor = function (mapMarkerObject) {
  this.draggable = mapMarkerObject.draggable;
  this.markerId = mapMarkerObject["$mqa.id$"];
  this.selected = false;
  this.latLng = mapMarkerObject.latLng;
}