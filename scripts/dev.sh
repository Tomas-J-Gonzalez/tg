#!/bin/bash

# Development script for local Hugo server
# This script sets up the local development environment

echo "🚀 Starting Hugo development server..."

# Set environment variable for development
export HUGO_ENV=development

# Start Hugo server with development config
hugo server --config config.development.toml --bind 0.0.0.0 --port 1313 --disableFastRender
