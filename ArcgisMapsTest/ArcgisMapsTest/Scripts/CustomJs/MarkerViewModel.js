function MarkerViewModel() {
  var thisObject = this;
  this.draggable = false;
  this.markerId = "";
  this.selected = false;
  this.latLng = {};

  this.mapFromMapMarker = function (marker) {
    thisObject.draggable = marker.draggable;
    thisObject.markerId = marker["$mqa.id$"];
    thisObject.selected = false;
    thisObject.latLng = marker.latLng;
  };
}