#!/bin/sh

env NODE_ENV=production webpack --config webpack/webpack.config.client.prod.js --progress --colors
env NODE_ENV=production webpack --config webpack/webpack.config.server.prod.js --progress --colors
cd meteor_core
[ ! -d .prod ] || mv .prod prod
[ ! -d dev   ] || mv dev .dev
rm -rvf ../dist
METEOR_SETTINGS=$(cat ../settings/prod.json) && meteor build ../dist
