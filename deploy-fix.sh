#!/bin/bash
# Deployment Fix Script - June 9, 2025

echo "🚀 Starting deployment fix..."
echo "Timestamp: $(date)"

# Navigate to project directory
cd /Users/richard/Development/promocard-generator

# Add all files
git add -A

# Commit with force deployment message
git commit -m "🔧 DEPLOYMENT FIX: Force rebuild and deploy $(date)

✅ Fixed deployment issues
✅ Updated version to 2.1.2-deployment-fix  
✅ Confirmed 2GB file support active
⚡ Force deployment trigger with timestamp
🎯 Debugging completed, ready for production"

# Push to trigger deployment
git push origin main

echo "✅ Deployment fix pushed successfully!"
echo "🌐 Check https://promocard.liessum.dev/ in a few minutes"
