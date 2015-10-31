var getPointsOnLine = require('./getPointsOnLine');

module.exports = function(bounds, latSteps, lonSteps) {
  var northWest = bounds[0];
  var southEast = bounds[1];
  var southWest = [southEast[0], northWest[1]];
  var northEast = [northWest[0], southEast[1]];

  var nwsw = getPointsOnLine(northWest, southWest, latSteps);
  var nese = getPointsOnLine(northEast, southEast, latSteps);

  var rows = [];

  for (var r = 0; r < latSteps; r++) {
    var west = nwsw[r];
    var east = nese[r];
    rows[r] = getPointsOnLine(west, east, lonSteps);
  }

  return rows;
}
