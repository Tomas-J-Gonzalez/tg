#!/bin/bash

# Production build script
# This script builds the site for production deployment

set -e
echo "🏗️ Building Hugo site for production..."

# Optionally fetch private FA7 assets when variables are set
if [ -n "$FA7_ASSETS_URL" ] && [ -n "$FA7_ASSETS_TOKEN" ]; then
  echo "🔐 Fetching private FA7 assets..."
  mkdir -p static/fa7
  # Download to a temp file and fail if HTTP error
  curl -fL --retry 3 -H "Authorization: Bearer $FA7_ASSETS_TOKEN" "$FA7_ASSETS_URL" -o /tmp/fa7.zip
  echo "📦 Unzipping FA7 assets..."
  unzip -o -q /tmp/fa7.zip -d static/fa7
  rm -f /tmp/fa7.zip
  echo "🔎 Contents of static/fa7 after unzip:"
  ls -la static/fa7 || true
  ls -la static/fa7/css || true
  ls -la static/fa7/webfonts || true
  # Sanity check required files
  if [ ! -f static/fa7/css/sharp.css ]; then
    echo "❌ Missing static/fa7/css/sharp.css after unzip" >&2
    exit 1
  fi
  if [ ! -d static/fa7/webfonts ]; then
    echo "❌ Missing static/fa7/webfonts directory after unzip" >&2
    exit 1
  fi
  echo "✅ FA7 assets ready."
fi

# Set environment variable for production
export HUGO_ENV=production

# Build Hugo site for production
hugo --minify --cleanDestinationDir

echo "✅ Production build complete!"
