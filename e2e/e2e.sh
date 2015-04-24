#!/bin/bash -e

port=3000

killport() {
	local pid=`lsof  -i :$1 | grep LISTEN | awk '{print $2}'`

	if [ -n "$pid" ]; then
		kill $pid
	fi
}

killport $port

node app.js&

sleep 1

./node_modules/mocha/bin/mocha 'e2e/**/*.js'

killport $port
