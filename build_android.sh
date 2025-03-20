#!/bin/bash

# Exit script if any command fails
set -e

# Check if a message is provided
if [ -z "$1" ]; then
    echo "Usage: $0 \"Your Dynamic Message\""
    exit 1
fi

DYNAMIC_TEXT="$1"
BUILD_DIR="android/app/build/outputs/apk"
OUTPUT_DIR="./"

# Navigate to the Android folder
cd android || exit

# Clean old builds
echo "🧹 Cleaning old builds..."
./gradlew clean

# Function to build, zip, and move artifacts
build_and_zip() {
    VARIANT=$1
    APK_PATH="${BUILD_DIR}/${VARIANT}/release/app-${VARIANT}-release.apk"
    ZIP_FILE="${OUTPUT_DIR}SIM-${DYNAMIC_TEXT}-DC-${VARIANT}.zip"

    echo "🚀 Building ${VARIANT} variant..."
    
    # Build the variant
    ./gradlew assemble${VARIANT^}Release
    
    # Check if the APK is generated
    if [ ! -f "$APK_PATH" ]; then
        echo "❌ Error: APK not found for ${VARIANT}!"
        exit 1
    fi

    echo "📦 Zipping ${VARIANT} build..."
    zip -j "$ZIP_FILE" "$APK_PATH"

    echo "✅ ${VARIANT} build zipped successfully: $ZIP_FILE"
}

echo "🎯 Starting React Native Android build process..."
echo "📌 Dynamic Text: $DYNAMIC_TEXT"

# Build and zip both variants
build_and_zip "global"
build_and_zip "french"

# Navigate back to the root directory
cd ..

echo "🎉 All builds completed successfully!"
