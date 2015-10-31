var Readable = require('stream').Readable;
var http = require('http');
var querystring = require('querystring');
var polyline = require('polyline');
var getLatLonGrid = require('./utils/getLatLonGrid');

var rs = Readable();

var test = {
  grid: [
    [[0,0,0],[0,1,0]],
    [[1,0,1],[1,1,1]],
    [[2,0,0],[2,1,0]]
  ]
}

rs._read = function() {
  // this.push(JSON.stringify(test));
  // this.push(null);
}


module.exports = function(options) {
  // var points = getPointsOnLine(options.bounds[0], options.bounds[1], 50);
  // console.log(points)
  //
  // var encoded_polyline = polyline.encode(points);
  //
  // console.log(polyline.decode(encoded_polyline).length)

  var grid = getLatLonGrid(options.bounds, options.latSteps, options.lonSteps);
  console.log(grid);

  rs.push(null);

  // var params = querystring.stringify({
  //   layer: options.layer,
  //   fields: options.field,
  //   access_token: options.access_token,
  //   encoded_polyline: encoded_polyline
  // });
  // console.log(params)
  // var path = `/v4/surface/${options.mapid}.json?${params}`;
  //
  // http.get({
  //   host: 'api.mapbox.com',
  //   path: path
  // }, function(response) {
  //   // console.log(response)
  //   // Continuously update stream with data
  //   var body = '';
  //   response.on('data', function(d) {
  //       body += d;
  //   });
  //   response.on('end', function() {
  //       var parsed = JSON.parse(body);
  //       // console.log(body)
  //       // console.log(JSON.stringify(parsed));
  //       // console.log(parsed.results.length);
  //       parsed.results.forEach(function(val) {
  //         console.log(val.latlng.lat +  ',' + val.latlng.lat + '->' + val.ele)
  //       })
  //       rs.push(null)
  //   });
  // });
  return rs;
};
