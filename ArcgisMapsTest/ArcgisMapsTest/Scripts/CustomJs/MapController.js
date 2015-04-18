var MapController = {};
(function (controller) {
  controller.map = null;
  controller.defaultIconImageUrl = "";
  controller.defaultSelectedIconImageUrl = "";

  controller.createMap = function (divId, latLng, mtype, options) {
    var optionsForMap = {
      elt: $("#" + divId)[0],
      zoom: options.zoom || 5,
      latLng: latLng || { lat: 0, lng: 0 },
      mtype: mtype,
      zoomOnDoubleCheck: options.zoomOnDoubleCheck || true
    };

    controller.map = new MQA.TileMap(optionsForMap);
    controller.init();
  };

  controller.createMarker = function (lat, lng, imageUrl) {
    return controller.createMarker({ lat: lat, lng: lng }, imageUrl);
  };

  controller.createMarker = function (latLng, imageUrl) {
    var marker = new MQA.Poi(latLng, new MQA.Icon(imageUrl || controller.defaultIconImageUrl, 22, 28));
    controller.map.addShape(marker);
    return marker;
  };

  controller.setDraggableToMarker = function (marker, draggable) {
    marker.draggable = draggable;
  };

  controller.setDraggableToMarker = function (markerId, draggable) {
    var marker = controller.getShapeById(markerId);
    controller.setDraggableToMarker(marker, draggable);
  };

  controller.getShapeById = function (shapeId) {
    var result = null;
    var shapes = controller.map.getShapes();

    for (var i = 0; i < shapes.items.length; i++) {
      if (shapes.items[i]["$mqa.id$"] === shapeId) {
        result = shapes.items[i];
        break;
      }
    }

    return result;
  };

  controller.addListener = function (eventName, callback) {
    MQA.EventManager.addListener(controller.map, eventName, callback);
  };

  controller.setDefaultIconForMarker = function (url) {
    controller.defaultIconImageUrl = url;
  };

  controller.setDefaultIconForSelectedMarker = function (url) {
    controller.defaultSelectedIconImageUrl = url;
  };

  controller.init = function () {
    MQA.withModule('shapes', 'largezoom', 'mousewheel', function () {
      controller.map.addControl(
        new MQA.LargeZoom(),
        new MQA.MapCornerPlacement(MQA.MapCorner.TOP_LEFT, new MQA.Size(5, 5))
      );

      controller.map.enableMouseWheelZoom();
    });
  };
}(MapController))