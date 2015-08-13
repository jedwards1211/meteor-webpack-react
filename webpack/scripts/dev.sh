#!/bin/sh

rm -rvf assets
(
  # the client dev config is redundantly built beforehand so there will be a copy of
  # the react commons chunk on disk for the react-runtime fork to pick up
  webpack-dev-server --config webpack/webpack.config.client.dev.js --progress --colors &&
  webpack --config webpack/webpack.config.server.js --progress --colors --watch &&

  # wait for server bundle to be output
  (while : ; do
    pwd &
    [ -f 'webpack/assets/server.bundle.js' ] && break
    sleep 1
  done) &&

  cd meteor_core &&
  ([ ! -d prod ] || mv prod .prod) &&
  ([ ! -d .dev ] || mv .dev dev  ) &&
  meteor &
) | cat

