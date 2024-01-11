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

export default defineConfig({
  define,
  build: {
    lib: {
      entry,
      formats: ['es'],
    },
  },
  plugins: [tsconfigPaths()],
  resolve: {
    alias: Object.fromEntries(
      Object.entries(versionInfo).map(([key, value]) => [
        key,
        // Use jsdelivr for browser
        value.path ||
          `https://cdn.jsdelivr.net/npm/${key}@${value.version}/+esm`,
      ]),
    ),
  },
});
