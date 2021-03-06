var Readable = require('stream').Readable;
var http = require('http');
var querystring = require('querystring');
var _ = require('underscore');
var polyline = require('polyline');
var getLatLonGrid = require('./utils/getLatLonGrid');
var turf = require('turf');

var rs = Readable();
rs._read = function() {}

var rootPath, params, rows, results, numRequests, totalRequests, options;

module.exports = function(_options) {

  options = _options;

  rootPath = `/v4/surface/${options.mapid}.json?`;
  params = {
    layer: options.layer,
    fields: options.field,
    interpolate: true,
    access_token: options.access_token
  };

  rows = getLatLonGrid(options.bounds, options.latSteps, options.lonSteps);

  totalRequests = rows.length;
  numRequests = 0;
  results = [];

  for (var i = 0; i < rows.length; i++) {
    setTimeout(_.partial(fetch, i), i*0);
  }

  return rs;
};

function fetch(i) {
  var points = rows[i];
  params.encoded_polyline = polyline.encode(points);
  // params.points = points.map(function(pt) {
  //   return `${pt[1]},${pt[0]}`;
  // }).join(';');
  var path = `${rootPath}${querystring.stringify(params)}`;
  http.get({
    host: 'api.mapbox.com',
    path: path
  }, _.partial(responseHandler, i));
}


function responseHandler(i, response) {
    // console.log(arguments[1])
    var body = '';
    response.on('data', function(d) {
        body += d;
    });
    response.on('end', function() {
        var parsed = JSON.parse(body);

        results[i] = parsed.results;
        numRequests++;
        if (numRequests === totalRequests) {
          complete();
        }

    });
}

function complete() {
  var points_g = toGeoJSON(results);

  rs.push(JSON.stringify(points_g));
  rs.push(null);
}

function toGeoJSON() {
  var pts = [];
  results.forEach(function(row) {
    row.forEach(function(pt) {
      var gpt = turf.point([pt.latlng.lng, pt.latlng.lat]);
      gpt.properties = {
        // store value, typically elevation, specified by options.field
        v: pt[options.field]
      }
      pts.push(gpt);
    })
  })
  var fc = turf.featurecollection(pts)
  return fc;
}
