#!/usr/bin/env node

var mapbox_texture = require('../src/services/mapbox_texture');

var options = {
  mapid: "mapbox.outdoors",
  access_token: require('./token.js')
}
var viewport = {
  center: ['47.787089', '-123.530895'],
  zoom: 11,
  width: 1280,
  height: 1280
}

var texture = mapbox_texture.getTextureURL(viewport, options);

console.log(texture);
