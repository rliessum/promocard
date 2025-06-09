#!/usr/bin/env zsh
# Simple deployment trigger
cd /Users/richard/Development/promocard-generator
git add . 
git commit -m "Deploy fix $(date +%H:%M:%S)"
git push origin main
