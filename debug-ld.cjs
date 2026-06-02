const fs = require('fs');
const src = fs.readFileSync('dist/assets/index-Sl730o-I.js', 'utf8');
const lines = src.split('\n');
const line = lines[251]; // line 252 (0-indexed)

// find 'ld' function definition
// try patterns
const patterns = ['function ld(', 'ld=function(', ',ld=function(', 'ld(', 'var ld=', 'const ld=', 'let ld='];
for (const p of patterns) {
  const idx = line.indexOf(p);
  if (idx >= 0) {
    console.log(`Pattern "${p}" found at ${idx}:`);
    console.log(line.substring(Math.max(0, idx-20), Math.min(line.length, idx+500)));
    console.log('---');
  }
}

// Also check between 49500-50200 for context
console.log('Context 49500-51000:');
console.log(line.substring(49500, 51000));
