import { readFile } from 'fs/promises';

async function getVersion(name) {
  const pkg = JSON.parse(
    await readFile(`node_modules/${name}/package.json`, 'utf8'),
  );
  return pkg.version;
}

function camelize(name) {
  return name
    .replace(/\W+/g, ' ')
    .trim()
    .replace(/ \w/g, (m) => m[1].toUpperCase());
}

const packages = [
  '@highlightjs/cdn-assets',
  'js-yaml',
  'mermaid',
  'remarkable',
  'webfontloader',
  'vega',
  'vega-embed',
  'vega-lite',
  'emoji-js',
  'helia',
  '@helia/ipns',
  '@helia/unixfs',
  'multiformats',
  '@unocss/reset',
  '@unocss/runtime',
  '@ipld/car',
  'ipfs-car',
  'ipfs-unixfs-exporter',
];

/** @type Record<string, { identifier: string; version: string; path: string }> */
export const versionInfo = Object.fromEntries(
  await Promise.all(
    packages.map(async (name) => {
      const version = await getVersion(name);
      return [
        name,
        {
          identifier: camelize(name),
          version,
          path: '',
        },
      ];
    }),
  ),
);

versionInfo.mermaid.path = `https://cdn.jsdelivr.net/npm/mermaid@${versionInfo.mermaid.version}/dist/mermaid.esm.min.mjs`;
