/*eslint-env browser */
/*global THREE*/

var camera, controls, scene, renderer;
var terrain, textureMaterial;

var loader = new THREE.XHRLoader();
loader.load('demo.json', function(text) {
  var rawGeom = JSON.parse(text).geometries[0].data;
  var geomLoader = new THREE.JSONLoader();
  var geometry = geomLoader.parse(rawGeom).geometry;
  geometry.computeBoundingSphere();
  // var material = new THREE.MeshBasicMaterial( { wireframe: true, color: 0x00ff00 } );


  var textureLoader = new THREE.TextureLoader();
  textureLoader.load('test.png', function (texture) {
    textureMaterial = new THREE.MeshBasicMaterial( {
      map: texture
    });
    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var cube = new THREE.Mesh( geometry, textureMaterial );
    // scene.add( cube );
    terrain = new THREE.Mesh( geometry, textureMaterial );
    scene.add( terrain );

    render();
  })
});



function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  camera.position.z = 200;
  camera.position.y = 20;

  controls = new THREE.TrackballControls( camera );

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;

  controls.noZoom = false;
  controls.noPan = false;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  controls.keys = [ 65, 83, 68 ];

  controls.addEventListener( 'change', render );

  render()
}


init();
animate();

function animate() {
  requestAnimationFrame( animate );
  controls.update();
}

function render() {
  renderer.render( scene, camera );
}
