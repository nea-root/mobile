#!/bin/bash
set -e

V_YEAR=`date "+%Y"`
V_MINOR=`expr ${V_YEAR} - 2022`
V_DATE=`date "+%m%d%H%M"`
NEW_VERSION="$V_MINOR$V_DATE"

sed -i "" "s/BUILD_VERSION\=.*/BUILD_VERSION\=${NEW_VERSION}/" ".env.dev"
sed -i "" "s/BUILD_VERSION\=.*/BUILD_VERSION\=${NEW_VERSION}/" ".env.prod"

echo "Gen new version: ${NEW_VERSION}"



