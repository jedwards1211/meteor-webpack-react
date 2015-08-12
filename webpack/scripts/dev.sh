#!/bin/sh

rm -rvf assets
(
  # the client dev config is redundantly built beforehand so there will be a copy of
  # the react commons chunk on disk for the react-runtime fork to pick up
  webpack-dev-server --config webpack.config.client.dev.js --progress --colors &
  webpack --config webpack.config.server.js --progress --colors --watch &
  # wait for server bundle to be output
  (while : ; do
    [ -f 'assets/server.bundle.js' ] && break
    sleep 1
  done) &&
  cd ../meteor && 
  ([ ! -d prod ] || mv prod .prod) && 
  ([ ! -d .dev ] || mv .dev dev  ) && 
  meteor &
) | cat
 