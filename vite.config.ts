import { globby } from 'globby';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { versionInfo } from './scripts/deps';

const entry = Object.fromEntries(
  (await globby(['./src/*.ts', './src/*/index.ts', '!**/*.d.ts']))
    .map((entry) => entry.replace(/\.ts$/, '').replace(/\/index$/, ''))
    .map((entry) => [entry.split('/').pop(), entry]),
);
const define = Object.fromEntries(
  Object.values(versionInfo).map((value) => [
    `__versions__.${value.identifier}`,
    JSON.stringify(value.version),
  ]),
);
const alias = Object.entries(versionInfo).map(([key, value]) => ({
  find: new RegExp(`^${key}($|/.*)`),
  // Use jsdelivr for browser
  replacement: value.path
    ? `${value.path}$1`
    : `https://cdn.jsdelivr.net/npm/${key}@${value.version}$1/+esm`,
}));

const isTargetBrowser = process.env.TARGET === 'browser';

export default defineConfig({
  define,
  build: {
    emptyOutDir: false,
    outDir: isTargetBrowser ? 'dist' : 'dist/node',
    lib: {
      entry,
      formats: ['es'],
    },
    // Do not externalize for browser so they will be rewritten according to alias into ESM on CDN
  },
  plugins: [tsconfigPaths()],
  resolve: {
    alias: isTargetBrowser ? alias : undefined,
    extensions: isTargetBrowser ? ['.browser.ts', '.ts'] : undefined,
  },
});
