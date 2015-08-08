#!/bin/sh

(
  webpack --config webpack.config.client.prod.js --watch &
  webpack --config webpack.config.server.prod.js --watch & 
  cd ../meteor && 
  ([ ! -d .prod ] || mv .prod prod) && 
  meteor run --production &
) | cat
