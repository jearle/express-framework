#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Karma Server (http://karma-runner.github.io)"
echo "-------------------------------------------------------------------"
echo $BASE_DIR
karma start $BASE_DIR/../frontend_test/config/karma.conf.js $*
