require([
      "dojo/dom",
      "dojo/on",
      "esri/map",
      "esri/geometry/Point",
      "esri/symbols/PictureMarkerSymbol",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/graphic",
      "esri/layers/FeatureLayer",
      "esri/layers/GraphicsLayer",
      "esri/toolbars/draw",
      "esri/toolbars/edit",
      "esri/tasks/query",
      "dojo/domReady!"
], function (dom, on, Map, Point, PictureMarkerSymbol, SimpleMarkerSymbol, Graphic, FeatureLayer, GraphicLayer, Draw, Edit, Query) {
  var selectionToolbar, editToolbar;

  var map = new Map("mapDiv", {
    center: [-56.049, 38.485],
    zoom: 3,
    basemap: "osm"
  });

  var defaultSymbol = new SimpleMarkerSymbol().setColor(new dojo.Color([0, 0, 255]));
  var highlightSymbol = new SimpleMarkerSymbol().setColor(new dojo.Color([255, 0, 0]));

  map.on("load", initSelectionAndEditToolbar);

  var graphicLayer = new GraphicLayer();
  graphicLayer.on("mouse-over", function (geometry) {
    //alert('ASDF');
    map.setMapCursor("pointer");
    editToolbar.deactivate();
    editToolbar.activate(Edit.MOVE, geometry.graphic);
  });

  graphicLayer.on("mouse-out", function () {
    map.setMapCursor("default");
    editToolbar.deactivate();
  });
  //var featureLayer = new FeatureLayer();

  map.addLayer(graphicLayer);

  function initSelectionAndEditToolbar(event) {
    editToolbar = new Edit(event.map);

    //editToolbar.on("graphic-click", function() {
    //  alert('Hello!');
    //});

    selectionToolbar = new Draw(event.map);

    on(selectionToolbar, "DrawEnd", function (geometry) {
      selectionToolbar.deactivate();

      var results = [];
      dojo.forEach(graphicLayer.graphics, function (graphic) {
        if (geometry.contains(graphic.geometry)) {
          graphic.setSymbol(highlightSymbol);
        } else if (graphic.symbol == highlightSymbol) {
          graphic.setSymbol(defaultSymbol);
        }
      });
    });
  }

  on(dom.byId("addMarkerBtn"), "click", function () {
    var coor = new Point(dom.byId("xCoor").value, dom.byId("yCoor").value);
    //var symbol = new PictureMarkerSymbol("http://www.clker.com/cliparts/I/l/L/S/W/9/map-marker-md.png", 40, 40);

    var graphic = new Graphic(coor, defaultSymbol);
    graphicLayer.add(graphic);
  });

  on(dom.byId("selectMarkers"), "click", function () {
    selectionToolbar.activate(Draw.EXTENT);
  });
});