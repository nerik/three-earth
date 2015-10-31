var mapbox_surface = require('../src/services/mapbox_surface');
var three_json = require('../src/out/three_json.js');

var service = mapbox_surface({
  token: "XXX"
});

var out = three_json();

service.pipe(out);
