var geoViewport = require('geo-viewport');
var define_bounds = require('../define_bounds.js');
var querystring = require('querystring');

module.exports.getTextureURL = getTextureURL;
module.exports.getViewportFromBounds = getViewportFromBounds;

function getTextureURL(viewport, _options) {

  var rootPath = `https://api.mapbox.com/v4/${_options.mapid}/${viewport.center[1]},${viewport.center[0]},${viewport.zoom}/${viewport.width}x${viewport.height}.png?`;
  var params = {
    access_token: _options.access_token
  }

  var url = `${rootPath}${querystring.stringify(params)}`;
  return {
    url: url,
    bounds: define_bounds(geoViewport.bounds(viewport.center, viewport.zoom, [viewport.width, viewport.height]))
  };
}

function getViewportFromBounds(_options) {
  var bounds = define_bounds(_options.bounds);
  var maxSize = _getMaxSize(_options.width, _options.height);

  var vp = geoViewport.viewport([
    bounds.south,
    bounds.west,
    bounds.north,
    bounds.east
  ], [maxSize.width, maxSize.height]);

  vp.width = maxSize.width;
  vp.height = maxSize.height;

  return vp;
}

function _getMaxSize(width, height) {
  var MAX_SIZE = 1280;
  var biggest = Math.max(width, height);

  var s = (width === biggest) ? MAX_SIZE/width : MAX_SIZE/height;

  return {
    width: Math.round(s * width),
    height: Math.round(s * height)
  }
}
