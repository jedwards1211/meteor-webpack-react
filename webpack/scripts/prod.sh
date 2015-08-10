#!/bin/sh

(
  env NODE_ENV=production webpack --config webpack.config.client.prod.js --watch &
  env NODE_ENV=production webpack --config webpack.config.server.prod.js --watch & 
  cd ../meteor && 
  ([ ! -d dev   ] || mv dev .dev  ) && 
  ([ ! -d .prod ] || mv .prod prod) && 
  meteor run --production &
) | cat
