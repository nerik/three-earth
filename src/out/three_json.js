var Writable = require('stream').Writable;
var ws = Writable();
ws._write = function (chunk, enc, next) {
    console.dir(chunk.toString('utf8'));
    next();
};

module.exports = function(options) {
  return ws;
};


// process.stdin.pipe(ws);
