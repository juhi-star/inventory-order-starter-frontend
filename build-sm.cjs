const { build } = require('vite');
build({ build: { minify: false, sourcemap: false } }).then(() => {
  console.log('Build complete (unminified)');
});
