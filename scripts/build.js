import { readdir, readFile } from 'fs/promises';
import { build } from 'esbuild';
import { replace } from 'esbuild-plugin-replace';

async function getVersion(name) {
  const pkg = JSON.parse(await readFile(`node_modules/${name}/package.json`, 'utf8'));
  return pkg.version;
}

const versions = {
  hljs: await getVersion('@highlightjs/cdn-assets'),
  jsYaml: await getVersion('js-yaml'),
  remarkable: await getVersion('remarkable'),
};

build({
  minify: true,
  outdir: 'dist',
  entryPoints: (await readdir('src'))
    .filter((item) => item.endsWith('.ts'))
    .map((item) => `src/${item}`),
  logLevel: 'info',
  bundle: true,
  format: 'esm',
  alias: {
    'js-yaml': `https://cdn.jsdelivr.net/npm/js-yaml@${versions.jsYaml}/+esm`,
    remarkable: `https://cdn.jsdelivr.net/npm/remarkable@${versions.remarkable}/+esm`,
  },
  plugins: [
    {
      name: 'add-ext',
      setup(build) {
        build.onResolve({ filter: /.*/ }, (args) => {
          if (args.importer && args.path.startsWith('./'))
            return { path: args.path + '.js', external: true };
        });
      },
    },
    replace(
      Object.fromEntries(
        Object.entries(versions).map(([key, value]) => [
          `__versions__.${key}`,
          JSON.stringify(value),
        ]),
      ),
    ),
  ],
});
