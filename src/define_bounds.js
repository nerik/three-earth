module.exports = function(bounds) {
  if (bounds.length === 4) {
    var _bounds = [
      [bounds[2],bounds[1]],
      [bounds[0],bounds[3]]
    ]
    bounds = _bounds;
  }
  bounds.north = bounds[0][0];
  bounds.south = bounds[1][0];
  bounds.west = bounds[0][1];
  bounds.east = bounds[1][1];
  return bounds;
}
