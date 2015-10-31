var lerp = require('lerp');

module.exports = function (start, end, numSteps) {
  var points = [];
  for (var i = 0; i < numSteps; i++) {
    var lat  = lerp(start[0], end[0], i * 1/(numSteps-1));
    var lon  = lerp(start[1], end[1], i * 1/(numSteps-1));
    points.push([lat, lon]);
  }
  return points;
}
