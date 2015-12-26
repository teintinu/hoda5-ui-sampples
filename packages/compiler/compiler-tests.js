var mdfs = Npm.require('mdfs');

var pendingTests = []
var __dirname = process.env['HODA5_COMPILER_CASES_FOLDER']
if (!__dirname) {
  Tinytest.add("JadeCompiler - cases", function (test) {
    test.fail('configure HODA5_COMPILER_CASES_FOLDER environment variable');
  });
}
else {
  mdfs.search(__dirname, function (md) {
    var title = md.mdfs.title;

    if (title) {
      var test_name = "JadeCompiler - " + md.mdfs.subfolder + md.mdfs.title
      if (md.mdfs.subfolder.substring(0, 10) == '/pending/') {
        pendingTests.push(test_name);
        return;
      }
      Tinytest.add(test_name, function (test) {

        md.refresh()
        if (md.mdfs.error) throw new Error(JSON.stringify(md, null, 2))
        var source = md['file.h5.js'];
        var expected = {
          server : md['file-server.js'],
          client : md['file-client.js'],
          test : md['file-test.js'],
          error : md['throw']
        }

        if (expected_error) {
          var err = { message: 'No error' };
          try {
            Hoda5Compiler.parse(source);
          }
          catch (e) {
            err = e;
          }
          if (err.message.indexOf(expected_error) == -1)
            test.equal(err.message, expected_error);
        }
        else {
          try {
            var actual = Hoda5Compiler.parse(source, {
              filename: 'file'
            });
            test.equal(Hoda5Compiler.stringify(actual.server), Hoda5Compiler.stringify(expected.server));
            test.equal(Hoda5Compiler.stringify(actual.server), Hoda5Compiler.stringify(expected.server));
            test.equal(Hoda5Compiler.stringify(actual.test), Hoda5Compiler.stringify(expected.test));
          }
          catch (e) {
            console.log(Hoda5Compiler.stringify(md, null, 2));
            throw e;
          }
        }
      });
    }
    else {
      Tinytest.add("JadeCompiler - " + md.mdfs.fullname, function (test) {
        test.fail(JSON.stringify(md, null, 2));
      });
    }
  });
  if (pendingTests.length)
    Tinytest.add("JadeCompiler - THERE IS SOME PENDING TESTS", function (test) {
      var msg = 'There is ' + pendingTests.length + ' pending test(s)'
      console.log(msg);
    });
}

var removeLineComment = function (code) {
  var lineBreak = "\n";
  return _.map(code.split(lineBreak), function (line) {
    return line.replace(/(.+?)\s*\/\/ [0-9]+/, "$1");
  }).join(lineBreak);
};

var tpl2txt = function (tplName) {
  var tpl = Template[tplName];
  if (!tpl.renderFunction)
    throw Error("The template object doesn't have a render function");
  return removeLineComment(tpl.renderFunction.toString());
};

//