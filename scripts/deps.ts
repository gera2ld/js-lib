import { readFile } from 'node:fs/promises';

async function getMetadata(name: string) {
  const pkg = JSON.parse(
    await readFile(`node_modules/${name}/package.json`, 'utf8'),
  );
  return {
    version: pkg.version,
  };
}

function camelize(name: string) {
  return name
    .replace(/\W+/g, ' ')
    .trim()
    .replace(/ \w/g, (m) => m[1].toUpperCase());
}

const packages = [
  'dayjs',
  'es-toolkit',
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
  '@unocss/runtime',
];

export const versionInfo: Record<
  string,
  {
    identifier: string;
    version: string;
    path: string;
  }
> = Object.fromEntries(
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
