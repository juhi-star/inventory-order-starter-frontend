import { readFileSync, writeFileSync } from 'fs';

const files = [
  'src/components/ui/card.jsx',
  'src/components/ui/label.jsx', 
  'src/components/ui/badge.jsx',
  'src/components/ui/form.jsx',
  'src/components/ui/button.jsx',
  'src/components/ui/alert.jsx',
  'src/components/ui/skeleton.jsx',
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
  
  // Remove "use client" directives (not needed in Vite)
  c = c.replace(/^"use client";?\s*\n/gm, '');
  c = c.replace(/^"use client"\s*\n/gm, '');

  // Fix bare `children` text -> {children}
  c = c.replace(/>\s*children\s*<\//g, '>{children}<');
  c = c.replace(/>\s*children\s*</g, '>{children}<');

  // === Add {...props} to self-closing elements in components with ...props ===
  // Strategy: For each component definition that uses ...props,
  // find the self-closing element (/>) that is the component's return value
  // and is NOT part of a child element (i.e., no > before it that opens a tag)
  
  // Pattern A: inline arrow func with self-closing: ...props}) => <Tag ... />
  // The component ends at ; or ) after />
  c = c.replace(
    /(\.\.\.props[^)]*\)\s*=>\s*<(\w+(?:\.\w+)*)(\s[^>]*?))(\s*\/>\s*[;)])/g,
    (match, before, tagName, attrs, end) => {
      if (match.includes('{...props}')) return match;
      // Don't match if the tag has children (has > before a </TagName)
      const beforeTag = before + '<' + tagName + attrs;
      // Check if this is truly self-closing by seeing if there's a > before />
      // in the content between tag and />
      // Actually, just check if attrs has > (which would mean the tag already opened)
      if (attrs.includes('>')) return match;
      return before + '<' + tagName + attrs + ' {...props}' + end;
    }
  );

  // Pattern B: block body with return: ...props}) => { ... return <Tag ... />; }
  c = c.replace(
    /(\.\.\.props[\s\S]*?\)\s*=>\s*\{[\s\S]*?return\s*<(\w+(?:\.\w+)*)(\s[^>]*?))(\s*\/>\s*;)/g,
    (match, before, tagName, attrs, end) => {
      if (match.includes('{...props}')) return match;
      if (attrs.includes('>')) return match;
      return before + '<' + tagName + attrs + ' {...props}' + end;
    }
  );

  // Pattern C: components without forwardRef (function components)
  c = c.replace(
    /(function\s+\w+\s*\(\{[^}]*?\.\.\.props[^}]*\}\)[\s\S]*?return\s*<(\w+(?:\.\w+)*)(\s[^>]*?))(\s*\/>\s*;)/g,
    (match, before, tagName, attrs, end) => {
      if (match.includes('{...props}')) return match;
      if (attrs.includes('>')) return match;
      return before + '<' + tagName + attrs + ' {...props}' + end;
    }
  );

  // Pattern D: function components without return keyword (=> automatic return)
  c = c.replace(
    /(function\s+\w+\s*\(\{[^}]*?\.\.\.props[^}]*\}\)[\s\S]*?\n\s*\{?return\s*<(\w+(?:\.\w+)*)(\s[^>]*?))(\s*\/>\s*[;]}])/g,
    (match, before, tagName, attrs, end) => {
      if (match.includes('{...props}')) return match;
      if (attrs.includes('>')) return match;
      return before + '<' + tagName + attrs + ' {...props}' + end;
    }
  );

  // Pattern E: more specific - match any self-closing element that uses ref={ref}
  // and is in a ...props context
  c = c.replace(
    /((?:\.\.\.props|,\s*\.\.\.props)[^>]*?)(\s*\/\s*>)/g,
    (match, before, selfClose) => {
      if (match.includes('{...props}')) return match;
      return before + ' {...props}' + selfClose;
    }
  );

  if (c !== o) {
    writeFileSync(fp, c);
    fixed++;
    console.log(`Fixed: ${fp}`);
  }
}

console.log(`\nFixed ${fixed} files`);
