#!/bin/bash

# Promo Card Generator - Deployment Verification Script
# Date: June 9, 2025
# Purpose: Verify all optimizations are deployed correctly

echo "🚀 PROMO CARD GENERATOR - DEPLOYMENT VERIFICATION"
echo "=================================================="
echo

# Check if we're in the right directory
if [ ! -f "dist/index.html" ]; then
    echo "❌ Error: Run this script from the promocard-generator root directory"
    exit 1
fi

echo "📁 Checking file structure..."

# Check core files
files_to_check=(
    "dist/index.html"
    "dist/promo-cards.html"
    "dist/manifest.json"
    "dist/sw.js"
    "dist/robots.txt"
    "dist/sitemap.xml"
    "dist/icon-192.svg"
    "dist/icon-512.svg"
    "dist/favicon.svg"
    "dist/output.css"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file - Found"
    else
        echo "❌ $file - Missing"
    fi
done

echo
echo "🔍 Checking PWA files..."

# Check manifest.json content
if grep -q '"name".*"Artist Promo Cards"' dist/manifest.json; then
    echo "✅ Manifest - App name correct"
else
    echo "❌ Manifest - App name issue"
fi

if grep -q '"theme_color".*"#1DB954"' dist/manifest.json; then
    echo "✅ Manifest - Theme color correct"
else
    echo "❌ Manifest - Theme color issue"
fi

# Check service worker
if grep -q "CACHE_NAME.*promo-cards" dist/sw.js; then
    echo "✅ Service Worker - Cache name correct"
else
    echo "❌ Service Worker - Cache name issue"
fi

echo
echo "🎨 Checking accessibility improvements..."

# Check for ARIA labels
if grep -q "aria-label" dist/index.html; then
    echo "✅ Accessibility - ARIA labels found"
else
    echo "❌ Accessibility - ARIA labels missing"
fi

# Check for semantic HTML
if grep -q "<aside" dist/index.html; then
    echo "✅ Accessibility - Semantic HTML found"
else
    echo "❌ Accessibility - Semantic HTML missing"
fi

echo
echo "🔐 Checking security improvements..."

# Check for CSP header
if grep -q "Content-Security-Policy" dist/index.html; then
    echo "✅ Security - CSP header found"
else
    echo "❌ Security - CSP header missing"
fi

echo
echo "📈 Checking SEO improvements..."

# Check robots.txt
if grep -q "User-agent: \*" dist/robots.txt; then
    echo "✅ SEO - robots.txt format correct"
else
    echo "❌ SEO - robots.txt format issue"
fi

# Check sitemap
if grep -q "<urlset" dist/sitemap.xml; then
    echo "✅ SEO - sitemap.xml format correct"
else
    echo "❌ SEO - sitemap.xml format issue"
fi

echo
echo "🎯 Checking de-branding..."

# Check for any remaining Spotify references
spotify_files=$(grep -r -l "spotify" dist/ 2>/dev/null | grep -v ".git" || true)
if [ -z "$spotify_files" ]; then
    echo "✅ De-branding - No Spotify references found"
else
    echo "⚠️  De-branding - Spotify references found in: $spotify_files"
fi

echo
echo "📱 Checking mobile optimization..."

# Check for viewport meta tag
if grep -q 'name="viewport"' dist/index.html; then
    echo "✅ Mobile - Viewport meta tag found"
else
    echo "❌ Mobile - Viewport meta tag missing"
fi

# Check for theme-color meta tag
if grep -q 'name="theme-color"' dist/index.html; then
    echo "✅ Mobile - Theme color meta tag found"
else
    echo "❌ Mobile - Theme color meta tag missing"
fi

echo
echo "=================================================="
echo "🏁 VERIFICATION COMPLETE"
echo
echo "📊 Next Steps:"
echo "1. Test the live site at: https://promocard.liessum.dev/"
echo "2. Run Lighthouse audit to verify scores"
echo "3. Test PWA installation"
echo "4. Verify download functionality"
echo "5. Test on mobile devices"
echo
echo "🚀 Your Promo Card Generator is ready for production!"
