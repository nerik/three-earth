module.exports = function (rows, bounds) {
  var nw = bounds[0];

  var latOffset = nw[0];
  var lonOffset = nw[1];

  var targetSize = 100;
  var n = nw[0];
  var s = bounds[1][0];
  var latAmp = Math.max(n,s) - Math.min(n,s);
  var scale = targetSize/latAmp;

  for (var r = 0; r < rows.length; r++) {
    var cols = rows[r];
    for (var c = 0; c < cols.length; c++) {
      cols[c][0] = scale * (Math.abs(cols[c][0] - latOffset));
      cols[c][1] = scale * (cols[c][1] - lonOffset);
    }
  }
  return rows;
}
