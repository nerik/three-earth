var THREE = require('three');
var tesselate = require('./utils/tesselate');
var getVertices = require('./utils/getVertices');
var normalizeVertices = require('./utils/normalizeVertices');

function _getScene(geometry) {
  var scene = new THREE.Scene();
  var material = new THREE.MeshBasicMaterial( { wireframe: true } );
  material.side = THREE.DoubleSide;
  var cube = new THREE.Mesh(geometry, material);
  scene.add( cube );
  return scene.toJSON();
}

function _getGeometry(vertices, tin_g) {
  var geometry = new THREE.Geometry();

  // set up vertices
  geometry.vertices = vertices;

  // set up faces
  for (var j = 0; j < tin_g.features.length; j++) {
    var indexes = tin_g.features[j].properties;
    // geometry.faces.push(new THREE.Face3(indexes.a, indexes.b, indexes.c));
    geometry.faces.push(new THREE.Face3(indexes.a, indexes.c, indexes.b));

  }

  // set up uvs
  geometry.computeBoundingBox();
  var max = geometry.boundingBox.max;
  var range = new THREE.Vector2(max.x, max.z);
  var faces = geometry.faces;

  geometry.faceVertexUvs[0] = [];

  for (var i = 0; i < geometry.faces.length ; i++) {

    var v1 = geometry.vertices[faces[i].a],
    v2 = geometry.vertices[faces[i].b],
    v3 = geometry.vertices[faces[i].c];

    geometry.faceVertexUvs[0].push(
    [
        new THREE.Vector2(v1.x/range.x, 1-(v1.z/range.y)),
        new THREE.Vector2(v2.x/range.x, 1-(v2.z/range.y)),
        new THREE.Vector2(v3.x/range.x , 1-(v3.z/range.y))
    ]);
  }

  // set up normals


  geometry.name = 'terrain'+Math.random();
  return geometry;
}

var three_json = function (points_g, _options) {
  var tin_g = tesselate(points_g);
  var vertices = getVertices(points_g);
  var normalizedVertices = normalizeVertices(vertices, _options.bounds, _options.scaleY);
  var geometry = _getGeometry(normalizedVertices, tin_g);
  // this.push(JSON.stringify(tin_g));
  // this.push('---\n');
  // next();
  // return;
  var scene = _getScene(geometry);
  scene.metadata.generator = 'https://github.com/nerik/three-earth';
  return scene;
}

var through = require('through2');
var options;

function writeStream(buffer, encoding, next) {
  var points = JSON.parse(buffer.toString());
  var out = three_json(points, options);
  this.push(JSON.stringify(out));
  next();
}

three_json.getStream = function(_options) {
  options = _options;
  return through(writeStream);
}

module.exports = three_json;
