var turf = require('turf');

var pts = [];
pts =[
  turf.point([0, 0]),
  turf.point([10, 20]),
  turf.point([10, 0]),
  turf.point([0, 10]),
  turf.point([20, 20])

]

var points = turf.featurecollection(pts);

var THREE = require('three');

var geometry = new THREE.Geometry();

for (var i = 0; i < points.features.length; i++) {
  points.features[i].properties.index = i;
  var coords = points.features[i].geometry.coordinates;
  geometry.vertices.push(new THREE.Vector3(coords[0],0,coords[1]));
}


var tin = turf.tin(points, 'index')
for (var j = 0; j < tin.features.length; j++) {
  var indexes = tin.features[j].properties;
  geometry.faces.push(new THREE.Face3(indexes.a, indexes.b, indexes.c));
}

// console.log(JSON.stringify(tin))


function getScene(geometry) {
  var scene = new THREE.Scene();
  var material = new THREE.MeshBasicMaterial( { color: 0xFF00FF } );
  material.side = THREE.DoubleSide;
  var cube = new THREE.Mesh(geometry, material);
  scene.add( cube );
  return scene.toJSON();
}

var scene = getScene(geometry);

console.log(JSON.stringify(scene));
