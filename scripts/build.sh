#!/bin/bash

# Production build script
# This script builds the site for production deployment

set -e
echo "🏗️ Building Hugo site for production..."

# Optionally fetch private FA7 assets when variables are set
prepare_fallback() {
  echo "🛟 Using fallback FA7 assets from repo (static/vendor/fa7)"
  mkdir -p static/fa7/css static/fa7/webfonts
  # Copy SHARP and BRANDS webfonts if present
  cp -f static/vendor/fa7/FA7-SHARP/*.woff2 static/fa7/webfonts/ 2>/dev/null || true
  cp -f static/vendor/fa7/FA7-SHARP/*.woff  static/fa7/webfonts/ 2>/dev/null || true
  cp -f static/vendor/fa7/FA7-BRANDS/*.woff2 static/fa7/webfonts/ 2>/dev/null || true
  cp -f static/vendor/fa7/FA7-BRANDS/*.woff  static/fa7/webfonts/ 2>/dev/null || true
  # Build minimal CSS from the font-squirrel stylesheets
  if [ -f static/vendor/fa7/FA7-SHARP/stylesheet.css ]; then
    cp -f static/vendor/fa7/FA7-SHARP/stylesheet.css static/fa7/css/sharp.css
  fi
  if [ -f static/vendor/fa7/FA7-BRANDS/stylesheet.css ]; then
    cp -f static/vendor/fa7/FA7-BRANDS/stylesheet.css static/fa7/css/brands.css
  fi
  # Rewrite font URLs to ../webfonts/ (portable across macOS/Linux)
  if [ -f static/fa7/css/sharp.css ]; then
    perl -0777 -pe "s|url\((?:'|")?([^/'\"]+\.(?:woff2|woff))(?:'|")?\)|url('../webfonts/$1')|g" \
      -i static/fa7/css/sharp.css || true
  fi
  if [ -f static/fa7/css/brands.css ]; then
    perl -0777 -pe "s|url\((?:'|")?([^/'\"]+\.(?:woff2|woff))(?:'|")?\)|url('../webfonts/$1')|g" \
      -i static/fa7/css/brands.css || true
  fi
  echo "🔎 Fallback contents:"; ls -la static/fa7; ls -la static/fa7/css; ls -la static/fa7/webfonts
}

if [ -n "$FA7_ASSETS_URL" ] && [ -n "$FA7_ASSETS_TOKEN" ]; then
  echo "🔐 Fetching private FA7 assets..."
  echo "URL: $FA7_ASSETS_URL"
  mkdir -p static/fa7
  # Try download; on failure, use fallback
  if curl -fL --retry 3 \
      -H "Authorization: token $FA7_ASSETS_TOKEN" \
      -H "Accept: application/octet-stream" \
      "$FA7_ASSETS_URL" -o /tmp/fa7.zip; then
    echo "📦 Unzipping FA7 assets..."
    unzip -o -q /tmp/fa7.zip -d static/fa7
    rm -f /tmp/fa7.zip
    echo "🔎 Contents of static/fa7 after unzip:"; ls -la static/fa7 || true; ls -la static/fa7/css || true; ls -la static/fa7/webfonts || true
    if [ ! -f static/fa7/css/sharp.css ] || [ ! -d static/fa7/webfonts ]; then
      echo "⚠️  Downloaded archive missing expected files; falling back to repo copy."
      prepare_fallback
    else
      echo "✅ FA7 assets ready."
    fi
  else
    echo "⚠️  Download failed (404/401). Falling back to repo copy."
    prepare_fallback
  fi
else
  # No envs set; use fallback so icons still render
  prepare_fallback
fi

# Set environment variable for production
export HUGO_ENV=production

# Build Hugo site for production
hugo --minify --cleanDestinationDir

echo "✅ Production build complete!"
