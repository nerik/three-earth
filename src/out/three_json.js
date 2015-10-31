var through = require('through2');
var THREE = require('three');

var stream = through(write, end);

function write(buffer, encoding, next) {
  var serviceData = JSON.parse(buffer.toString());
  var geometry = getGeometry(serviceData.grid);
  var scene = getScene(geometry);
  this.push(JSON.stringify(scene));
  next();
}

function end (done) {
  done();
}

function getScene(geometry) {
  var scene = new THREE.Scene();
  var material = new THREE.MeshBasicMaterial( { wireframe: true } );
  material.side = THREE.DoubleSide;
  var cube = new THREE.Mesh(geometry, material);
  scene.add( cube );
  return scene.toJSON();
}

function getGeometry(grid) {
  var geometry = new THREE.Geometry();
  var vertexCount = 0;
  var numRows = grid.length;
  var numCols = grid[0].length;

  for (var r = 0; r < numRows; r++) {
    var row = grid[r];
    for (var c = 0; c < numCols; c++) {
      var vertex = row[c];
      var x = vertex[1]; //lon
      var y = vertex[2]; //value
      var z = vertex[0]; //lat

      geometry.vertices.push(new THREE.Vector3(x,y,z));

      //omit last row and lost col for face creation
      if (c !== numCols-1 && r !== numRows-1) {
        geometry.faces.push(new THREE.Face3(vertexCount, vertexCount+numCols, vertexCount+1));
        geometry.faces.push(new THREE.Face3(vertexCount+1, vertexCount+numCols, vertexCount+numCols+1));
      }

      vertexCount++;
      // console.log(rawPoint)
    }
  }
  //   geometry.vertices.push(
  // 	new THREE.Vector3( 0, 0, 1 ),
  // 	new THREE.Vector3( 1, 0, 1),
  // 	new THREE.Vector3( 0, 0, 2 )
  // );
  //
  // geometry.faces.push( new THREE.Face3( 0, 2, 1 ) );
  geometry.name = 'terrain'+Math.random();
  return geometry;
}

module.exports = function(options) {
  return stream;
};
