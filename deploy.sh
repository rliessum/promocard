#!/bin/bash

# Promo Card Generator - Netlify Deployment Script
# This script builds and deploys the project to Netlify

echo "🚀 Starting Netlify deployment..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to Netlify
    echo "🌐 Deploying to Netlify..."
    
    if [ "$1" = "prod" ] || [ "$1" = "production" ]; then
        echo "🎯 Deploying to production..."
        netlify deploy --prod --dir=dist
    else
        echo "🧪 Deploying preview..."
        netlify deploy --dir=dist
    fi
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi
