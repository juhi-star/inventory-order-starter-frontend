import { readFileSync, writeFileSync } from 'fs';

const files = [
  'src/components/ui/card.jsx',
  'src/components/ui/label.jsx', 
  'src/components/ui/form.jsx',
  'src/components/ui/button.jsx',
  'src/components/ui/alert.jsx',
  'src/components/ui/table.jsx',
  'src/components/ui/dropdown-menu.jsx',
  'src/components/ui/dialog.jsx',
  'src/components/ui/sheet.jsx',
  'src/components/ui/select.jsx',
  'src/components/ui/separator.jsx',
];

let fixed = 0;

for (const fp of files) {
  let c = readFileSync(fp, 'utf-8');
  const o = c;

  // Fix 1: duplicated tag+attrs: <Tag attrs}<Tag attrs {...props} {...props} /> -> <Tag attrs {...props} />
  c = c.replace(
    /(<\w+(?:\.\w+)*[\s\S]*?)\1\s*\{\.\.\.props\}\s*\{\.\.\.props\}\s*\/>/g,
    (match, tagPart) => {
      // tagPart = <Tag attrs} - strip the trailing }
      const cleaned = tagPart.replace(/\}$/, '');
      return cleaned + ' {...props} />';
    }
  );

  // Fix 2: remaining double {...props} {...props} -> single {...props}
  c = c.replace(/\{\.\.\.props\}\s*\{\.\.\.props\}/g, '{...props}');

  // Fix 3: bare `children` text -> {children}
  c = c.replace(/>\s*children\s*<\//g, '>{children}<');
  c = c.replace(/>\s*children\s*</g, '>{children}<');

  if (c !== o) {
    writeFileSync(fp, c);
    fixed++;
    console.log(`Fixed: ${fp}`);
  }
}

console.log(`\nFixed ${fixed} files`);
