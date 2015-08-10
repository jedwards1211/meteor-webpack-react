#!/bin/sh

(
  node dev-server.js &
  webpack --config webpack.config.server.js --watch &
  cd ../meteor && 
  ([ ! -d prod ] || mv prod .prod) && 
  ([ ! -d .dev ] || mv .dev dev  ) && 
  meteor &
) | cat
 