#!/bin/bash
. ./update-version.sh
GRADLE_TASK=$1

cd android
./gradlew $GRADLE_TASK

[ $? -eq 0 ] && echo "APK exported in android/app/build/outputs/apk"