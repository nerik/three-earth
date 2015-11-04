var turf = require('turf');

var tesselate = function(points_g) {
  for (var i = 0; i < points_g.features.length; i++) {
    //store vertex indexes for later face construction in THREE
    points_g.features[i].properties.index = i;
  }
  var tin_g = turf.tin(points_g, 'index');
  return tin_g;
};

var through = require('through2');

function writeStream(buffer, encoding, next) {
  var points = JSON.parse(buffer.toString());
  var out = tesselate(points);
  this.push(JSON.stringify(out));
  next();
}

tesselate.getStream = function() {
  return through(writeStream);
}

module.exports = tesselate;
