import { readFileSync } from 'fs';

// Pick a simple case: separator.jsx
const c = readFileSync('src/components/ui/separator.jsx', 'utf-8');

// Find the duplicate pattern
const idx = c.indexOf(')}<');
console.log('Index of )}< :', idx);

// Get the context around the seam
const context = c.slice(idx - 10, idx + 120);
console.log('Context:');
console.log(JSON.stringify(context));
console.log();

// Try the regex step by step
const textBefore = c.slice(0, idx + 3); // up to and including )}
const textAfter = c.slice(idx + 3);    // after )}

console.log('Before seam (last 60):', JSON.stringify(textBefore.slice(-60)));
console.log('After seam (first 60):', JSON.stringify(textAfter.slice(0, 60)));
console.log();

// The regex pattern
const regex = /(<\w+(?:\.\w+)*(?:\s[\s\S]*?)?\)\})<\1\s*\{\.\.\.props\}\s*\/>/g;

// Find all matches in the ENTIRE file
let match;
regex.lastIndex = 0;
while ((match = regex.exec(c)) !== null) {
  console.log('Match found at index', match.index);
  console.log('Group 1:', JSON.stringify(match[1]).slice(0, 100));
  console.log('Full match:', JSON.stringify(match[0]).slice(0, 100));
}

// If no match, try the regex from the seam position
regex.lastIndex = idx;
match = regex.exec(c);
if (match) {
  console.log('\nMatch from seam position:');
  console.log('Group 1:', JSON.stringify(match[1]).slice(0, 100));
} else {
  console.log('\nNo match from seam position either');
  
  // Try to understand why
  // Let's extract what group 1 would capture
  const group1Regex = new RegExp('<(\\w+(?:\\.\\w+)*(?:\\s[\\s\\S]*?)?\\)\\})');
  group1Regex.lastIndex = idx - 100; // search from before the seam
  const g1Match = group1Regex.exec(c.slice(idx - 100));
  if (g1Match) {
    console.log('\nGroup1 from near seam:', JSON.stringify(g1Match[1]).slice(0, 100));
    const captured = g1Match[1];
    // Now check if the pattern after the seam starts with < + captured + {...props} />
    const afterSeam = c.slice(idx + 3);
    const expected = '<' + captured + ' {...props} />';
    console.log('Expected after seam:', JSON.stringify(expected.slice(0, 80)));
    console.log('Actual after seam:', JSON.stringify(afterSeam.slice(0, 80)));
    console.log('Match?', afterSeam.startsWith('<' + captured));
  }
}
