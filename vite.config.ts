import { globby } from 'globby';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import pkg from './package.json' with { type: 'json' };
import { versionInfo } from './scripts/deps';

const TARGET = process.env.TARGET || 'node';

const dependencies = Object.keys(pkg.dependencies);
const entry = Object.fromEntries(
  (await globby(['./src/*.ts', '!**/*.d.ts']))
    .filter((entry) =>
      TARGET === 'browser' ? true : !entry.endsWith('.browser.ts'),
    )
    .map((entry) => entry.replace(/(?:\.browser)?\.ts$/, ''))
    .map((entry) => [entry.split('/').pop(), entry]),
);
const define = Object.fromEntries(
  Object.values(versionInfo).map((value) => [
    `__versions__.${value.identifier}`,
    JSON.stringify(value.version),
  ]),
);

let alias: Array<{ find: RegExp; replacement: string }> | undefined;
if (TARGET !== 'node') {
  alias = Object.entries(versionInfo).map(([key, value]) => ({
    find: new RegExp(`^${key}($|/.*)`),
    // Use jsdelivr for browser
    replacement: value.path
      ? `${value.path}$1`
      : `https://cdn.jsdelivr.net/npm/${key}@${value.version}$1/+esm`,
  }));
}

export default defineConfig({
  define,
  build: {
    emptyOutDir: false,
    outDir: {
      browser: 'dist',
      node: 'dist/node',
      deno: 'dist/deno',
    }[TARGET],
    lib: {
      entry,
      formats: ['es'],
    },
    rollupOptions: {
      // Do not externalize for browser so they will be rewritten according to alias into ESM on CDN
      external:
        TARGET === 'node'
          ? (id) =>
              /^(?:node|npm):/.test(id) ||
              dependencies.some((dep) => id === dep || id.startsWith(`${dep}/`))
          : TARGET === 'deno'
            ? (id) => /^(?:node|npm):/.test(id)
            : undefined,
    },
  },
  plugins: [tsconfigPaths()],
  resolve: {
    alias,
    extensions: TARGET === 'browser' ? ['.browser.ts', '.ts'] : undefined,
  },
});
