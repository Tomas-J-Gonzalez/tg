#!/bin/bash

# Production build script
# This script builds the site for production deployment

echo "🏗️ Building Hugo site for production..."

# Set environment variable for production
export HUGO_ENV=production

# Build Hugo site for production
hugo --minify --cleanDestinationDir

echo "✅ Production build complete!"
