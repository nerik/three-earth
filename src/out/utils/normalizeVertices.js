// converts to cartesian coordinates and scales
module.exports = function (vertices, bounds, scaleY) {
  var nw = bounds[0];
  var se = bounds[1];

  var latOffset = -nw[0];
  var lonOffset = nw[1];

  var targetSize = 100;
  var n = nw[0];
  var s = se[0];
  var e = se[1];
  var w = nw[1];
  var latAmp = Math.max(n,s) - Math.min(n,s);
  var lonAmp = Math.max(e,w) - Math.min(e,w);
  var scale = targetSize/latAmp;

  // console.log(lonAmp*scale)

  for (var i = 0; i < vertices.length; i++) {
    vertices[i].x = scale * (vertices[i].x - lonOffset);
    vertices[i].z = scale * (-vertices[i].z - latOffset);

    vertices[i].y =vertices[i].y * scaleY;
  }
  return vertices;

}
