var data = [
  [[0,0],[0,1]],
  [[1,0],[1,1],[1,2]],
  [[2,0],[2,1],[2,2]]
]

var vertices = [];

for (var i = 0; i < data.length; i++) {
  for (var j = 0; j < data[i].length; j++) {
    vertices.push(data[i][j][0])
    vertices.push(data[i][j][1])
  }
}

// console.log(vertices);

// console.log(require('earcut')(vertices));
console.log(require('earcut')([0,0,0,1,1,0,1,1]));
