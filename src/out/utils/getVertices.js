module.exports = function getVertices(points_g) {
  var vertices = [];
  for (var i = 0; i < points_g.features.length; i++) {
    var coords = points_g.features[i].geometry.coordinates;
    var v = points_g.features[i].properties.v || 0;
    vertices.push({
      x: coords[0],
      y: v,
      z: coords[1]
    });
  }
  return vertices;
}
