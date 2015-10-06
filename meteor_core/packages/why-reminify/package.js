Package.describe({
  name: 'mindfront:why-reminify',
  version: '1.0.0',
  summary: 'standard-minifiers fork that leaves .min.js files untouched',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: "why-reminify",
  use: [
    'minifiers'
  ],
  npmDependencies: {
    "source-map": "0.4.2"
  },
  sources: [
    'plugin/minify-css.js',
    'plugin/why-reminify-js.js',
  ]
});

Package.onUse(function(api) {
  api.use('isobuild:minifier-plugin@1.0.0');
});

Package.onTest(function(api) {
});
