#!/usr/bin/env node

// var bounds = [
//   [ 28.506431579589844, -16.83970461701538 ],
//   [ 28.066978454589844, -16.41863185161586 ]
// ];

var bounds = [
  [ 48.22654724121094, -56.71091303022315 ],
     [ 47.34764099121094, -56.22541305969477 ]
   ]


var mapbox_surface = require('../src/services/mapbox_surface');
var three_json = require('../src/out/three_json.js');
var tesselate = require('../src/out/utils/tesselate.js');

var mapbox = mapbox_surface({
  bounds: bounds,
  latSteps: 200,
  lonSteps: 200,
  mapid: "mapbox.mapbox-terrain-v1",
  layer: "contour",
  field: "ele",
  access_token: require('./token.js')
});

mapbox
  .pipe(three_json.getStream({
    bounds: bounds,
    scaleY: .01
  }))
  // .pipe(tesselate.getStream())
  .pipe(process.stdout)
