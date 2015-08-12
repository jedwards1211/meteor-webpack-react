#!/bin/sh

rm -rvf assets
(
  node-inspector &
  webpack-dev-server --config webpack.config.client.dev.js --progress --colors &
  webpack --config webpack.config.server.js --watch &
  # wait for server bundle to be output
  (while : ; do
    [ -f 'assets/server.bundle.js' ] && break
    sleep 1
  done) &&
  cd ../meteor && 
  ([ ! -d prod ] || mv prod .prod) && 
  ([ ! -d .dev ] || mv .dev dev  ) && 
  export NODE_OPTIONS='--debug=5858' &&
  meteor &
) | cat
