#!/bin/bash

# Production build script
# This script builds the site for production deployment

echo "🏗️ Building Hugo site for production..."

# Optionally fetch private FA7 assets when variables are set
if [ -n "$FA7_ASSETS_URL" ] && [ -n "$FA7_ASSETS_TOKEN" ]; then
  echo "🔐 Fetching private FA7 assets..."
  mkdir -p static/fa7 && cd static/fa7 || exit 1
  curl -sSL -H "Authorization: Bearer $FA7_ASSETS_TOKEN" "$FA7_ASSETS_URL" -o fa7.zip
  unzip -o -q fa7.zip && rm -f fa7.zip
  cd - >/dev/null || exit 1
fi

# Set environment variable for production
export HUGO_ENV=production

# Build Hugo site for production
hugo --minify --cleanDestinationDir

echo "✅ Production build complete!"
