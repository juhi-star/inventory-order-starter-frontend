import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';

const SRC = join(import.meta.dirname, 'src');
const ROOT = join(import.meta.dirname);

function processDir(dirPath) {
  for (const entry of readdirSync(dirPath)) {
    const full = join(dirPath, entry);
    if (statSync(full).isDirectory()) {
      processDir(full);
    } else if (extname(full) === '.jsx') {
      fixFile(full);
    }
  }
}

function fixFile(filePath) {
  let code = readFileSync(filePath, 'utf8');
  const orig = code;

  // Fix bare identifier attribute values: onClick=onNavigate -> onClick={onNavigate}
  // Match: propName=identifier followed by space, >, or />
  // Exclude: propName="string", propName={expr}, propName='string', propName
  code = code.replace(
    /([\w-]+)=([a-zA-Z_$][a-zA-Z0-9_$.]*)(\s|\/?>|[ \t]+\/{0,2})/g,
    (match, prop, val, after) => {
      // Don't wrap if it's a JSX attribute with string value
      if (val.startsWith('"') || val.startsWith("'") || val.startsWith('{')) return match;
      // Don't wrap known HTML boolean attributes or string-typed attributes
      const skipProps = ['type', 'variant', 'size', 'placeholder', 'className', 'aria-label', 'asChild'];
      if (skipProps.includes(prop) && /^[a-z-]+$/.test(val)) return match;
      return `${prop}={${val}}${after}`;
    }
  );

  if (code !== orig) {
    writeFileSync(filePath, code, 'utf8');
    console.log(`Fixed: ${relative(ROOT, filePath)}`);
  }
}

processDir(SRC);
console.log('Done!');
