# three-earth

Grabs earth elevation data from readily available APIs and builds 3D models for three.js.

## Goal

To provide a quick and dirty way to have bits of earth in your 3D scene, using APIs available to everyone for most parts of the planet (such as Mapbox, Google, etc).

## Why not using...

- cesiumjs is perfect for Google Earth like functionality, it can show way more detailed terrains, but is a bit difficult to set up and a bit of a heavy machinery. Three.js is really easy to hack around.

- [Bjorn Sandvik](http://blog.thematicmapping.org/2013/10/terrain-building-with-threejs-part-1.html) has really good, thorough tutorials on how to do that using DEM files or [WCS web services](http://blog.thematicmapping.org/2014/03/using-web-map-services-with-threejs.html), but the goal of three-earth is to spare you the effort of looking for data sources for the area you're targeting.
