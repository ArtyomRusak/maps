function MapController() {
  var controller = this;
  this.map = {};

  this.createMap = function (divId, latLng, mtype, options) {
    var optionsForMap = {
      elt: $("#" + divId)[0],
      zoom: options.zoom || 5,
      latLng: latLng || { lat: 0, lng: 0 },
      mtype: mtype,
      zoomOnDoubleCheck: options.zoomOnDoubleCheck || true
    };

    controller.map = new MQA.TileMap(optionsForMap);
  };
}