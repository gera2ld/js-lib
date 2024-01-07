import { readFile } from 'fs/promises';
import { globby } from 'globby';
import { relative, resolve } from 'path';
import { OutputBundle, NormalizedOutputOptions } from 'rollup';
import { PluginOption, defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

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
  vega: await getVersion('vega'),
  vegaEmbed: await getVersion('vega-embed'),
  vegaLite: await getVersion('vega-lite'),
  emojiJs: await getVersion('emoji-js'),
  helia: await getVersion('helia'),
  heliaIpns: await getVersion('@helia/ipns'),
  heliaUnixfs: await getVersion('@helia/unixfs'),
  multiformats: await getVersion('multiformats'),
  unocssReset: await getVersion('@unocss/reset'),
  unocssRuntime: await getVersion('@unocss/runtime'),
  ipldCar: await getVersion('@ipld/car'),
  ipfsCar: await getVersion('ipfs-car'),
  ipfsUnixfsExporter: await getVersion('ipfs-unixfs-exporter'),
};

const entry = Object.fromEntries(
  (await globby(['./src/*.ts', './src/*/index.ts', '!**/*.d.ts']))
    .map((entry) => entry.replace(/\.ts$/, '').replace(/\/index$/, ''))
    .map((entry) => [entry.split('/').pop(), entry]),
);

export default defineConfig({
  define: {
    ...Object.fromEntries(
      Object.entries(versions).map(([key, value]) => [
        `__versions__.${key}`,
        JSON.stringify(value),
      ]),
    ),
  },
  build: {
    lib: {
      entry,
      formats: ['es'],
    },
  },
  plugins: [tsconfigPaths(), insertTsReference()],
  resolve: {
    alias: {
      'js-yaml': `https://cdn.jsdelivr.net/npm/js-yaml@${versions.jsYaml}/+esm`,
      mermaid: `https://cdn.jsdelivr.net/npm/mermaid@${versions.mermaid}/dist/mermaid.esm.min.mjs`,
      remarkable: `https://cdn.jsdelivr.net/npm/remarkable@${versions.remarkable}/+esm`,
      webfontloader: `https://cdn.jsdelivr.net/npm/webfontloader@${versions.webfontloader}/+esm`,
      helia: `https://esm.sh/helia@${versions.helia}`,
      '@helia/ipns': `https://esm.sh/@helia/ipns@${versions.heliaIpns}`,
      '@helia/unixfs': `https://esm.sh/@helia/unixfs@${versions.heliaUnixfs}`,
      multiformats: `https://esm.sh/multiformats@${versions.multiformats}`,
      '@ipld/car': `https://esm.sh/@ipld/car@${versions.ipldCar}`,
      'ipfs-car': `https://esm.sh/ipfs-car@${versions.ipfsCar}`,
      'ipfs-unixfs-exporter': `https://esm.sh/ipfs-unixfs-exporter@${versions.ipfsUnixfsExporter}`,
    },
  },
});

function insertTsReference(): PluginOption {
  return {
    name: 'ts-reference',
    generateBundle(_options: NormalizedOutputOptions, bundle: OutputBundle, _isWrite: boolean) {
      Object.values(bundle).forEach((chunk) => {
        if (chunk.type === 'asset' || !chunk.isEntry) return;
        const relpath = relative(resolve('src'), chunk.facadeModuleId);
        const dts = relpath.replace(/\.ts$/, '.d.ts');
        chunk.code = `/// <reference types="./${dts}" />\n\n${chunk.code}`;
      });
    },
  };
}
