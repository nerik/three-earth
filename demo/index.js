var mapbox_surface = require('../src/services/mapbox_surface');
var three_json = require('../src/out/three_json.js');

var service = mapbox_surface({
  bounds: [
    [10.200002, -11], //NW bound
    [-10, 11] //SE bound
  ],
  latSteps: 3,
  lonSteps: 3,
  mapid: "mapbox.mapbox-terrain-v1",
  layer: "contour",
  field: "ele",
  access_token: require('./token.js')
});

var out = three_json({

});


service
  .pipe(out)
  .pipe(process.stdout)
