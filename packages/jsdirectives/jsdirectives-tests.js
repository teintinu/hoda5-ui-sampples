
var h5$rt = {
  _data: [],
  _loc: [],
  debug(data, loc) {
    //   "x": x
    // }, ["original.js", 3, 2]);
  }
};

function double(x) {
  'debug';
  x;
  return x * 2;
}

Tinytest.add('example', function (test) {
  var quatro = double(2);
  test.equal(quatro, 4);
  test.equal(h5$rt._data, [{ 'x': 2 }]);
  test.equal(h5$rt._loc, [['jsdirectives-test.js', 13, 2]]);
});
