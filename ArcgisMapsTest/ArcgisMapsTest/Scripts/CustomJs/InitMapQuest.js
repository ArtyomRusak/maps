var draw = false;
var rectangleForChoose;
var mapDiv;
var offx, offy, map;
var points = new Array();
var selectedPoints = new Array();
var selectedIcon = new MQA.Icon('http://developer.mapquest.com/content/documentation/common/images/smiley.png', 22, 28);
var defaultIcon = new MQA.Icon('http://icons.mqcdn.com/icons/stop.png', 22, 28);
var selectForRoute = false;


$(function () {
  var options = {
    elt: $("#map")[0],
    zoom: 5,
    latLng: { lat: 0, lng: 0 },
    mtype: "map",
    zoomOnDoubleCheck: true
  };

  draw = false;
  mapDiv = $("#map")[0];
  offx = mapDiv.offsetLeft - mapDiv.scrollLeft;
  offy = mapDiv.offsetTop - mapDiv.scrollTop;
  map = new MQA.TileMap(options);
  MQA.EventManager.addListener(map, 'click', addButtonByClick);
  MQA.withModule('shapes', 'largezoom', 'mousewheel', function () {
    map.addControl(
      new MQA.LargeZoom(),
      new MQA.MapCornerPlacement(MQA.MapCorner.TOP_LEFT, new MQA.Size(5, 5))
    );

    map.enableMouseWheelZoom();
  });
});

function addButtonByClick(evt, evt2, evt3) {
  var poi = new MQA.Poi({ lat: evt.ll.lat, lng: evt.ll.lng });

  poi.myInfo = "Hello from " + evt.ll.lat + " " + evt.ll.lng;
  //poi.draggable = true;

  poi.setRolloverContent(poi.myInfo);

  MQA.EventManager.addListener(map, 'infowindowopen', function() {
    var btn = $("#myBtn");
    btn.click(function (evtParam) {
      //var r = evtParam;
      map.removeShape(poi);
    });
  });

  map.addShape(poi);
  poi.setInfoContentHTML("<button id='myBtn' "+ "pointId='" + poi["$mqa.id$"] + "'>Remove</button>");

  points.push(poi);
};

var suppressor = document.createElement('div'); // create a div to block map events, but don't use it until you want to drawr
suppressor.id = "stopit";
suppressor.style.position = "absolute";
suppressor.style.width = "100%";
suppressor.style.height = "100%";
suppressor.style.top = "0px";
suppressor.style.left = "0px";
suppressor.style.zIndex = "200";
suppressor.style.backgroundImage = "url(http://developer.mapquest.com/DevNet-Rebrand2-theme/html/themes/mq_theme/images/spacer.gif)";
suppressor.onmousedown = suppressorhandler;

function cursorPosition(evt) { // get cursor offsets
  var x = (MQA.Util.getBrowserInfo().name == "msie") ? window.event.clientX - offx : evt.pageX - offx;
  var y = (MQA.Util.getBrowserInfo().name == "msie") ? window.event.clientY - offy : evt.pageY - offy;// funky if scrolling in IE
  return map.pixToLL(new MQA.Point(x, y));
}

function suppressorhandler(e) {
  var cursorll1 = cursorPosition(e);
  rectangleForChoose = new MQA.RectangleOverlay();
  rectangleForChoose.borderWidth = 1;
  rectangleForChoose.fillColorAlpha = 0.5;
  rectangleForChoose.fillColor = "#00ff00";

  rectangleForChoose.shapePoints = [cursorll1.lat, cursorll1.lng];
  suppressor.onmousemove = function (evt) {
    var cursorll2 = cursorPosition(evt);
    rectangleForChoose.setShapePoints([
      /*
      make sure to get upper left and lower right points set correctly.
      */
      cursorll1.lat > cursorll2.lat ? cursorll1.lat : cursorll2.lat,
      cursorll1.lng < cursorll2.lng ? cursorll1.lng : cursorll2.lng,
      cursorll1.lat < cursorll2.lat ? cursorll1.lat : cursorll2.lat,
      cursorll1.lng > cursorll2.lng ? cursorll1.lng : cursorll2.lng
    ]);
    document.getElementById('duh').innerHTML = "<b>Shape Points:</b>" + rectangleForChoose.shapePoints;
  }

  map.addShape(rectangleForChoose);

  suppressor.onmouseup = function (evt) {
    suppressor.onmousemove = null;
    suppressor.onmouseup = null;
    mapDiv.removeChild(suppressor);
    mapDiv.appendChild(suppressor);

    selectedPoints = [];
    for (var i = 0; i < points.length; i++) {
      //if (points[i]) {

      //}
      var pointLatLng = points[i].latLng;
      var shapePoints = rectangleForChoose.getShapePoints();
      if (pointLatLng.lat < shapePoints[0] && pointLatLng.lat > shapePoints[2] && pointLatLng.lng > shapePoints[1] && pointLatLng.lng < shapePoints[3]) {
        points[i].setIcon(selectedIcon);
        selectedPoints.push(points[i]);
      } else {
        points[i].setIcon(defaultIcon);
      }
      //points[i].setState("red");
      var state = points[i].getState();
      var icon = points[i].getIcon();

      map.removeShape(rectangleForChoose);
    }
  }
}

$("#addMarkerBtn").click(function () {
  var poi = new MQA.Poi({ lat: $("#xCoor").val(), lng: $("#yCoor").val() });
  poi.setDeclutterMode(true);
  poi.myInfo = "Hello from " + $("#xCoor").val() + " " + $("#yCoor").val();
  //poi.draggable = true;

  poi.setRolloverContent(poi.myInfo);

  map.addShape(poi);
  points.push(poi);
});

$("#selectMarkers").click(function (btn) {
  if (draw) {
    mapDiv.removeChild(suppressor);
    btn.target.value = 'Select';
  } else {
    mapDiv.appendChild(suppressor);
    btn.target.value = 'Stop';
  }
  draw = !draw;
});

$("#selectMarkersForRoute").click(function (btn) {
  MQA.withModule('new-route', function () {
    var location = [];
    for (var i = 0; i < selectedPoints.length; i++) {
      location.push({ latLng: { lat: selectedPoints[i].latLng.lat, lng: selectedPoints[i].latLng.lng } });
    }

    if (location.length !== 0) {
      map.addOptimizedRoute({
        request: {
          locations: location
        }
      });
    }
  });
});

$("#deleteRoute").click(function() {
  map.removeRoute();
});

$("#AddMarkerClickBtn").click(function () {
  MQA.withModule('new-route', function () {
    var opt = {
      request: {
        locations: ['Gunnison, CO', 'Ouray, CO'],

        options: {
          avoids: [],
          avoidTimedConditions: false,
          doReverseGeocode: true,
          shapeFormat: 'raw',
          generalize: 0,
          routeType: 'fastest',
          timeType: 1,
          locale: 'ru_RU',
          unit: 'm',
          enhancedNarrative: false,
          drivingStyle: 2,
          highwayEfficiency: 21.0
        }
      },

      display: {
        color: '#800000',
        borderWidth: 10,
        draggablePoi: true
      },

      // on success, display the route narrative
      success: function displayNarrative(data) {
        if (data.route) {
          var legs = data.route.legs,
            html = '',
            i = 0,
            j = 0,
            trek,
            maneuver;

          html += '<table class="clean"><tbody>';

          for (; i < legs.length; i++) {
            for (j = 0; j < legs[i].maneuvers.length; j++) {
              maneuver = legs[i].maneuvers[j];
              html += '<tr>';
              html += '<td>';

              if (maneuver.iconUrl) {
                html += '<img src="' + maneuver.iconUrl + '" />';
              }

              for (k = 0; k < maneuver.signs.length; k++) {
                var sign = maneuver.signs[k];

                if (sign && sign.url) {
                  html += '<img src="' + sign.url + '" />';
                }
              }

              html += '</td><td>' + maneuver.narrative + '</td>';
              html += '</tr>';
            }
          }

          html += '</tbody></table>';
          $("#route-results")[0].innerHTML = html;
        }
      }
    };

    map.addRoute(opt);
  });
});