#!/bin/sh

(
  webpack-dev-server --config webpack.config.client.dev.js --progress --colors &
  webpack --config webpack.config.server.js --progress --colors --watch &
  cd ../meteor && 
  ([ ! -d prod ] || mv prod .prod) && 
  ([ ! -d .dev ] || mv .dev dev  ) && 
  meteor &
) | cat
 