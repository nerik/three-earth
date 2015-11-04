#!/usr/bin/env node

var bounds = [
  [28.520589, -16.962891], //NW bound
  [28.046531, -16.281738] //SE bound
];

var geoViewport = require('geo-viewport');

var vp = geoViewport.viewport([
    bounds[1][0],
    bounds[0][1],
    bounds[0][0],
    bounds[1][1]
], [640, 480])
// console.log(vp)
// return;

var mapbox_surface = require('../src/services/mapbox_surface');
var three_json = require('../src/out/three_json.js');
var tesselate = require('../src/out/utils/tesselate.js');



var mapbox = mapbox_surface({
  bounds: bounds,
  latSteps: 100,
  lonSteps: 100,
  mapid: "mapbox.mapbox-terrain-v1",
  layer: "contour",
  field: "ele",
  access_token: require('./token.js')
});

mapbox
  .pipe(three_json.getStream({
    bounds: bounds,
    scaleY: .03
  }))
  // .pipe(tesselate.getStream())
  .pipe(process.stdout)
