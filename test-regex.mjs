import { readFileSync } from 'fs';

const filePath = 'src/components/ui/card.jsx';
const content = readFileSync(filePath, 'utf-8');

const regex = /(\.\.\.props[^)]*\)\s*=>\s*<\w+(?:[\s\S]*?))(\s*\/>)/g;
let m;
let count = 0;
while ((m = regex.exec(content)) !== null) {
  count++;
  console.log(`Match ${count}:`);
  console.log(`  Before: ${JSON.stringify(m[1]).slice(0, 80)}...`);
  console.log(`  SelfClose: ${JSON.stringify(m[2])}`);
  console.log(`  Has {...props}: ${m[1].includes('{...props}')}`);
  console.log(`  Has >: ${m[1].includes('>')}`);
}
console.log(`\nTotal matches: ${count}`);
