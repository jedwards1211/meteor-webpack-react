#!/bin/sh

(
  node-inspector &
  webpack-dev-server --config webpack.config.client.dev.js --progress --colors &
  webpack --config webpack.config.server.js --watch &
  cd ../meteor && 
  ([ ! -d prod ] || mv prod .prod) && 
  ([ ! -d .dev ] || mv .dev dev  ) && 
  export NODE_OPTIONS='--debug=5858' &&
  meteor &
) | cat
