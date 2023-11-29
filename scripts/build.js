import { readFile } from 'fs/promises';
import { resolve, relative } from 'path';
import { globby } from 'globby';
import { build } from 'esbuild';
import { replace } from 'esbuild-plugin-replace';

async function getVersion(name) {
  const pkg = JSON.parse(
    await readFile(`node_modules/${name}/package.json`, 'utf8'),
  );
  return pkg.version;
}

const versions = {
  hljs: await getVersion('@highlightjs/cdn-assets'),
  jsYaml: await getVersion('js-yaml'),
  mermaid: await getVersion('mermaid'),
  remarkable: await getVersion('remarkable'),
  webfontloader: await getVersion('webfontloader'),
};

const entries = (
  await globby(['src/*.ts', 'src/*/index.ts', '!**/*.d.ts'])
).map((entry) => entry.replace(/\.ts$/, '').replace(/\/index$/, ''));

build({
  minify: true,
  outdir: 'dist',
  entryPoints: entries.map((path) => `./${path}`),
  logLevel: 'info',
  bundle: true,
  format: 'esm',
  alias: {
    'js-yaml': `https://cdn.jsdelivr.net/npm/js-yaml@${versions.jsYaml}/+esm`,
    mermaid: `https://cdn.jsdelivr.net/npm/mermaid@${versions.mermaid}/dist/mermaid.esm.min.mjs`,
    remarkable: `https://cdn.jsdelivr.net/npm/remarkable@${versions.remarkable}/+esm`,
    webfontloader: `https://cdn.jsdelivr.net/npm/webfontloader@${versions.webfontloader}/+esm`,
  },
  plugins: [
    {
      name: 'add-ext',
      setup(build) {
        build.onResolve({ filter: /.*/ }, (args) => {
          const relpath = args.path.startsWith('@/')
            ? args.path
            : relative(
                process.cwd(),
                resolve(process.cwd(), args.importer, '..', args.path),
              );
          if (relpath.startsWith('@/') || entries.includes(relpath)) {
            return { path: args.path.replace(/^@/, '.') + '.js', external: true };
          }
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
