#!/bin/bash

# Development script for local Hugo server
# This script sets up the local development environment

echo "🚀 Starting Hugo development server..."

# Set environment variable for development
export HUGO_ENV=development

HUGO="hugo"
[ -f "$(dirname "$0")/../bin/hugo" ] && HUGO="$(dirname "$0")/../bin/hugo"
$HUGO server --config config.development.toml --bind 0.0.0.0 --port 1313 --disableFastRender
