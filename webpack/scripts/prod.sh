#!/bin/sh

(
  env NODE_ENV=production webpack --config webpack.config.client.prod.js --progress --colors --watch &
  env NODE_ENV=production webpack --config webpack.config.server.prod.js --progress --colors --watch & 
  cd ../meteor && 
  ([ ! -d dev   ] || mv dev .dev  ) && 
  ([ ! -d .prod ] || mv .prod prod) && 
  meteor run --production &
) | cat
