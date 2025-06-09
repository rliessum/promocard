const fs = require('fs');

// List of Lighthouse report files to analyze
const reportFiles = [
  'lighthouse-report-current.html',
  'lighthouse-report-new.html',
  'lighthouse-report.html',
  'lighthouse-audit-20250609-222801.html',
  'lighthouse-audit-fresh.html'
];

function analyzeLighthouseReport(filename) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`ANALYZING: ${filename}`);
  console.log(`${'='.repeat(60)}`);

  try {
    // Read the HTML file
    const content = fs.readFileSync(filename, 'utf8');
  
  console.log('File size:', content.length, 'characters');
  
  // Look for script tags that might contain data
  const scriptMatches = content.match(/<script[^>]*>([\s\S]*?)<\/script>/g);
  console.log('Found', scriptMatches ? scriptMatches.length : 0, 'script tags');
  
  // Look for JSON-like patterns
  const jsonPatterns = [
    /window\.__LIGHTHOUSE_JSON__\s*=\s*({[\s\S]*?});/,
    /__LIGHTHOUSE_JSON__\s*=\s*({[\s\S]*?});/,
    /const\s+lhr\s*=\s*({[\s\S]*?});/,
    /var\s+lhr\s*=\s*({[\s\S]*?});/
  ];
  
  let found = false;
  for (let i = 0; i < jsonPatterns.length; i++) {
    const match = content.match(jsonPatterns[i]);
    if (match) {
      console.log('Found JSON data with pattern', i + 1);
      
      try {
        const jsonData = JSON.parse(match[1]);
        console.log('\n=== LIGHTHOUSE AUDIT ANALYSIS ===\n');
        
        // Basic info
        console.log('URL:', jsonData.finalDisplayedUrl || jsonData.requestedUrl || 'N/A');
        console.log('Audit Time:', new Date(jsonData.fetchTime).toLocaleString() || 'N/A');
        console.log('Lighthouse Version:', jsonData.lighthouseVersion || 'N/A');
        console.log('User Agent:', jsonData.userAgent || 'N/A');
        
        // All category scores
        console.log('\n--- CATEGORY SCORES ---');
        if (jsonData.categories) {
          Object.entries(jsonData.categories).forEach(([key, category]) => {
            if (category.score !== null) {
              const score = Math.round(category.score * 100);
              const status = score >= 90 ? '✅' : score >= 50 ? '⚠️' : '❌';
              console.log(`${category.title}: ${score}/100 ${status}`);
            }
          });
        }
        
        // Performance score details
        if (jsonData.categories && jsonData.categories.performance) {
          const perfScore = jsonData.categories.performance.score;
          if (perfScore !== null) {
            console.log('\n--- PERFORMANCE DETAILS ---');
            console.log('Overall Performance Score:', Math.round(perfScore * 100) + '/100');
          }
        }
        
        // Core Web Vitals
        console.log('\n--- CORE WEB VITALS ---');
        const coreVitals = [
          ['largest-contentful-paint', 'Largest Contentful Paint (LCP)'],
          ['first-contentful-paint', 'First Contentful Paint (FCP)'],
          ['cumulative-layout-shift', 'Cumulative Layout Shift (CLS)'],
          ['total-blocking-time', 'Total Blocking Time (TBT)'],
          ['speed-index', 'Speed Index'],
          ['interactive', 'Time to Interactive (TTI)']
        ];
        
        if (jsonData.audits) {
          coreVitals.forEach(([auditId, name]) => {
            if (jsonData.audits[auditId]) {
              const audit = jsonData.audits[auditId];
              let status = '';
              
              if (audit.score !== null) {
                const score = audit.score;
                if (score >= 0.9) status = ' ✅';
                else if (score >= 0.5) status = ' ⚠️';
                else status = ' ❌';
              }
              
              if (audit.displayValue) {
                console.log(`${name}: ${audit.displayValue}${status}`);
              } else if (audit.numericValue !== null && audit.numericValue !== undefined) {
                const value = audit.numericValue;
                let displayValue = '';
                if (auditId === 'cumulative-layout-shift') {
                  displayValue = value.toFixed(3);
                } else if (['largest-contentful-paint', 'first-contentful-paint', 'total-blocking-time', 'interactive'].includes(auditId)) {
                  displayValue = Math.round(value) + ' ms';
                } else if (auditId === 'speed-index') {
                  displayValue = value.toFixed(1);
                }
                console.log(`${name}: ${displayValue}${status}`);
              }
            }
          });
        }
        
        // Key opportunities and diagnostics
        console.log('\n--- KEY OPPORTUNITIES ---');
        if (jsonData.audits) {
          const opportunities = [
            'unused-css-rules',
            'unused-javascript',
            'modern-image-formats',
            'offscreen-images',
            'render-blocking-resources',
            'unminified-css',
            'unminified-javascript',
            'efficient-animated-content',
            'duplicated-javascript'
          ];
          
          opportunities.forEach(auditId => {
            if (jsonData.audits[auditId] && jsonData.audits[auditId].details && 
                jsonData.audits[auditId].details.overallSavingsMs > 0) {
              const audit = jsonData.audits[auditId];
              const savings = Math.round(audit.details.overallSavingsMs);
              console.log(`${audit.title}: ${savings}ms potential savings`);
            }
          });
        }
        
        // Accessibility issues
        console.log('\n--- ACCESSIBILITY HIGHLIGHTS ---');
        if (jsonData.categories && jsonData.categories.accessibility) {
          const a11yScore = Math.round(jsonData.categories.accessibility.score * 100);
          console.log(`Accessibility Score: ${a11yScore}/100`);
          
          if (jsonData.audits) {
            const a11yIssues = [
              'color-contrast',
              'image-alt',
              'label',
              'link-name',
              'button-name'
            ];
            
            a11yIssues.forEach(auditId => {
              if (jsonData.audits[auditId] && jsonData.audits[auditId].score < 1) {
                const audit = jsonData.audits[auditId];
                console.log(`⚠️ ${audit.title}`);
              }
            });
          }
        }
        
        return {
          filename,
          url: jsonData.finalDisplayedUrl,
          scores: jsonData.categories ? Object.fromEntries(
            Object.entries(jsonData.categories).map(([key, cat]) => [key, Math.round(cat.score * 100)])
          ) : {},
          timestamp: jsonData.fetchTime
        };
        
      } catch (parseError) {
        console.log('Error parsing JSON:', parseError.message);
        return null;
      }
    }
  }
  
  if (!found) {
    console.log('❌ No JSON data found with common patterns');
    
    // Check if this might be a different format
    if (content.includes('window.__LIGHTHOUSE_JSON__')) {
      console.log('Found reference to __LIGHTHOUSE_JSON__ but no assignment');
    }
    
    // Try to find any JSON with lighthouse characteristics
    const lighthouseStrings = [
      'lighthouseVersion',
      'fetchTime',
      'finalDisplayedUrl',
      'categories',
      'audits'
    ];
    
    for (const str of lighthouseStrings) {
      if (content.includes(`"${str}"`)) {
        console.log(`Found "${str}" in content`);
      }
    }
    return null;
  }

} catch (error) {
  console.error('❌ Error reading file:', error.message);
  return null;
}
}

// Main execution
console.log('🚀 LIGHTHOUSE REPORTS ANALYSIS');
console.log('Analyzing multiple Lighthouse reports...\n');

const results = [];
for (const filename of reportFiles) {
  if (fs.existsSync(filename)) {
    const result = analyzeLighthouseReport(filename);
    if (result) results.push(result);
  } else {
    console.log(`⚠️ File not found: ${filename}`);
  }
}

// Summary comparison
if (results.length > 0) {
  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 SUMMARY COMPARISON');
  console.log(`${'='.repeat(60)}`);
  
  results.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.filename}`);
    console.log(`   URL: ${result.url}`);
    console.log(`   Timestamp: ${new Date(result.timestamp).toLocaleString()}`);
    console.log('   Scores:', Object.entries(result.scores).map(([key, score]) => 
      `${key}: ${score}`).join(', '));
  });
  
  // Average scores
  if (results.length > 1) {
    console.log('\n--- AVERAGE SCORES ---');
    const categories = Object.keys(results[0].scores);
    categories.forEach(category => {
      const avg = results.reduce((sum, r) => sum + r.scores[category], 0) / results.length;
      console.log(`${category}: ${Math.round(avg)}/100`);
    });
  }
}
