import { readFileSync, writeFileSync } from 'fs';

const files = [
  'src/components/ui/alert.jsx', 'src/components/ui/table.jsx',
  'src/components/ui/separator.jsx', 'src/components/ui/dialog.jsx',
  'src/components/ui/sheet.jsx', 'src/components/ui/select.jsx',
  'src/components/ui/dropdown-menu.jsx',
];

let fixed = 0;

for (const fp of files) {
  let c = readFileSync(fp, 'utf-8');
  const o = c;

  // Fix duplicated tag: <Tag attrs...)}<Tag attrs... {...props} />
  // Group 1 = tagName+attrs WITHOUT the < prefix
  // Then <\1 matches the duplicate tag
  // Replace with: <tagName+attrs {...props} />
  const dupRegex = /(?:<(\w+(?:\.\w+)*(?:\s[\s\S]*?)?\)\}))<\1\s*\{\.\.\.props\}\s*\/>/g;
  c = c.replace(dupRegex, '<$1 {...props} />');

  // Fix bare children -> {children}
  c = c.replace(/>\s*children\s*<\//g, '>{children}<');
  c = c.replace(/>\s*children\s*</g, '>{children}<');

  if (c !== o) {
    writeFileSync(fp, c);
    fixed++;
    console.log(`Fixed: ${fp}`);
  }
}

console.log(`\nFixed ${fixed} files`);

// Verify
let remaining = 0;
for (const fp of files) {
  const c = readFileSync(fp, 'utf-8');
  if (/\)\}<\w/.test(c)) { remaining++; console.log(`Still has dup: ${fp}`); }
  if (/>\s*children\s*</.test(c)) { console.log(`Still has bare children: ${fp}`); }
}
console.log(`Files with remaining issues: ${remaining}`);
