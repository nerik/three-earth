var mapbox_surface = require('../src/services/mapbox_surface');
var three_json = require('../src/out/three_json.js');

var service = mapbox_surface({
  bounds: [
    [28.7, -16.8], //NW bound
    [27.7, -16.2] //SE bound
  ],
  latSteps: 10,
  lonSteps: 10,
  mapid: "mapbox.mapbox-terrain-v1",
  layer: "contour",
  field: "ele",
  access_token: require('./token.js')
});

var out = three_json();


service
  .pipe(out)
  .pipe(process.stdout)
