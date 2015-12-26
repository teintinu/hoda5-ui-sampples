Package.describe({
  name: 'hoda5:jsdirectives',
  version: '1.0.0',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Npm.depends({
  'jsdirectives': '1.0.0'
});

// Package.registerBuildPlugin({
//   name: 'jsdirectives',
//   use: ['ecmascript'],
//   sources: ['jsdirectivesAttach.js'],
//   npmDependencies: {
//     'jsdirectives': '1.0.0'
//   }
// });

Package.onUse(function (api) {
  api.use('isobuild:compiler-plugin@1.0.0');
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles('jsdirectivesAttach.js', 'server');
});

Package.onTest(function (api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('hoda5:jsdirectives');
  api.addFiles('jsdirectives-tests.js');
});
