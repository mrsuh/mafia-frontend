#!/bin/sh

cd "$( cd `dirname $0` && pwd )/.."

if [ ! -f app/config.js ]; then
   cp app/config.js.dist app/config.js
fi

npm install

node_modules/grunt/bin/grunt build
