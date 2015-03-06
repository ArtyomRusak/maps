$(function () {
  var options = {
    elt: $("#map")[0],
    zoom: 5,
    latLng: { lat: 0, lng: 0 },
    mtype: "map",
    zoomOnDoubleCheck: true
  };

  var map = new MQA.TileMap(options);
  var drawingOverlay = new MQA.DrawingOverlay();

  MQA.withModule('largezoom', 'mousewheel', function () {
    map.addControl(
      new MQA.LargeZoom(),
      new MQA.MapCornerPlacement(MQA.MapCorner.TOP_LEFT, new MQA.Size(5, 5))
    );

    map.enableMouseWheelZoom();
  });

  $("#addMarkerBtn").click(function () {
    var poi = new MQA.Poi({ lat: $("#xCoor").val(), lng: $("#yCoor").val() });
    poi.setDeclutterMode(true);
    poi.myInfo = "Hello from " + $("#xCoor").val() + " " + $("#yCoor").val();
    poi.draggable = true;

    poi.setRolloverContent(poi.myInfo);

    map.addShape(poi);
  });

  $("#selectMarkers").click(function () {

  });

  $("#AddMarkerClickBtn").click(function() {
    MQA.withModule('new-route', function() {
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
});