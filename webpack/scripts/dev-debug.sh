#!/bin/sh

(
  node-inspector &
  node dev-server.js &
  webpack --config webpack.config.server.js --watch &
  cd ../meteor && 
  ([ ! -d prod ] || mv prod .prod) && 
  ([ ! -d .dev ] || mv .dev dev  ) && 
  export NODE_OPTIONS='--debug=5858' &&
  meteor &
) | cat
