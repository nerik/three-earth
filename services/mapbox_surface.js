var Readable = require('stream').Readable;

var rs = Readable();
rs._read = function() {
  this.push('lala');
  this.push(null);
}

module.exports = function(options) {
  return rs;
};
