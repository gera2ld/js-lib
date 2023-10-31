import { readdir } from 'fs/promises';
import { build } from 'esbuild';

build({
  minify: true,
  outdir: 'dist',
  entryPoints: (await readdir('src')).filter(item => item.endsWith('.ts')).map(item => `src/${item}`),
  logLevel: 'info',
  bundle: true,
  format: 'esm',
  alias: {
    'js-yaml': 'https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/+esm',
    remarkable: 'https://cdn.jsdelivr.net/npm/remarkable@2.0.1/+esm',
  },
  plugins: [{
    name: 'add-ext',
    setup(build) {
      build.onResolve({ filter: /.*/ }, args => {
        if (args.importer && args.path.startsWith('./'))
          return { path: args.path + '.js', external: true }
      })
    },
  }],
});
