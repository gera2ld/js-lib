import { readdir } from 'fs/promises';
import { build } from 'esbuild';

build({
  minify: true,
  outdir: 'dist',
  entryPoints: (await readdir('src')).map(item => `src/${item}`),
  logLevel: 'info',
  bundle: true,
  format: 'esm',
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
