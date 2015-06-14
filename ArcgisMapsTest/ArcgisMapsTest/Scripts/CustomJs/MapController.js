var MapController = {};
(function (controller) {
  controller.map = null;
  controller.defaultIconImageUrl = "http://icons.mqcdn.com/icons/stop.png";
  controller.defaultSelectedIconImageUrl = "https://cdn3.iconfinder.com/data/icons/map-markers-2/512/marker_7-128.png";
  controller.defaultIcon = null;
  controller.defaultSelectedIcon = null;

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

  controller.createMarker = function (latLng, imageUrl) {
    var marker = new MQA.Poi(latLng, new MQA.Icon(imageUrl || controller.defaultIconImageUrl, 22, 28));
    controller.map.addShape(marker);
    controller.addExtraFieldForMarker(marker["$mqa.id$"], "selected", false);
    return marker;
  };

  controller.addExtraFieldForMarker = function (markerId, key, value) {
    var marker = controller.getShapeById(markerId);
    marker.addExtraField(key, value);
  };

  controller.setDraggableToMarker = function (markerId, draggable) {
    var marker = controller.getShapeById(markerId);
    marker.setDraggable(draggable);
  };

  controller.setSelectedForMarker = function (markerId, selected) {
    var marker = controller.getShapeById(markerId);
    marker.setIcon(selected ? controller.getDefaultIconForSelectedMarker() : controller.getDefaultIconForMarker());
    marker.extraFields.selected = selected;
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

  controller.setDefaultIconUrlForMarker = function (url) {
    controller.defaultIconImageUrl = url;
  };

  controller.setDefaultIconUrlForSelectedMarker = function (url) {
    controller.defaultSelectedIconImageUrl = url;
  };

  controller.setDefaultIconForMarker = function (imageUrl) {
    controller.defaultIcon = new MQA.Icon(imageUrl || controller.defaultIconImageUrl, 22, 28);
  }

  controller.setDefaultIconForSelectedMarker = function (imageUrl) {
    controller.defaultSelectedIcon = new MQA.Icon(imageUrl || controller.defaultSelectedIconImageUrl, 22, 28);
  }

  controller.getDefaultIconForMarker = function () {
    return controller.defaultIcon;
  }

  controller.getDefaultIconForSelectedMarker = function () {
    return controller.defaultSelectedIcon;
  }

  controller.init = function () {
    MQA.withModule('shapes', 'largezoom', 'mousewheel', function () {
      controller.map.addControl(
        new MQA.LargeZoom(),
        new MQA.MapCornerPlacement(MQA.MapCorner.TOP_LEFT, new MQA.Size(5, 5))
      );

      controller.map.enableMouseWheelZoom();
      controller.setDefaultIconUrlForMarker(controller.defaultIconImageUrl);
      controller.setDefaultIconUrlForSelectedMarker(controller.defaultSelectedIconImageUrl);
      controller.setDefaultIconForMarker();
      controller.setDefaultIconForSelectedMarker();
    });
  };
}(MapController))