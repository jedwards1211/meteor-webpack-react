#!/bin/sh

env NODE_ENV=production webpack --config webpack.config.client.prod.js --progress --colors
env NODE_ENV=production webpack --config webpack.config.server.prod.js --progress --colors
cd ../meteor
[ ! -d .prod ] || mv .prod prod
[ ! -d dev   ] || mv dev .dev
rm -rvf ../dist
meteor build ../dist
 
