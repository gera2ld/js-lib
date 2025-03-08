import { readFile } from 'fs/promises';

async function getMetadata(name) {
  const pkg = JSON.parse(
    await readFile(`node_modules/${name}/package.json`, 'utf8'),
  );
  return {
    version: pkg.version,
  };
}

function camelize(name) {
  return name
    .replace(/\W+/g, ' ')
    .trim()
    .replace(/ \w/g, (m) => m[1].toUpperCase());
}

const packages = [
  '@highlightjs/cdn-assets',
  'dayjs',
  'es-toolkit',
  'highlight.js',
  'shiki',
  '@shikijs/markdown-it',
  'yaml',
  'mermaid',
  'markdown-it',
  'markdown-it-ins',
  'markdown-it-mark',
  'markdown-it-sub',
  'markdown-it-sup',
  'markdown-it-anchor',
  'webfontloader',
  'vega',
  'vega-embed',
  'vega-lite',
  'emoji-js',
  '@unocss/reset',
  '@unocss/runtime',
];

/** @type Record<string, { identifier: string; version: string; path: string }> */
export const versionInfo = Object.fromEntries(
  await Promise.all(
    packages.map(async (name) => {
      const { version } = await getMetadata(name);
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
versionInfo['es-toolkit'].path =
  `https://cdn.jsdelivr.net/npm/es-toolkit@${versionInfo['es-toolkit'].version}/+esm`;
