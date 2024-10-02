import { transformAsync } from '@babel/core';
import tsSyntax from '@babel/plugin-syntax-typescript';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { globby } from 'globby';
import { dirname, join, normalize, relative } from 'path';
import { versionInfo } from './deps.js';

const dist = 'dist/deno';
const versionMap = Object.fromEntries(
  Object.values(versionInfo).map((value) => [value.identifier, value.version]),
);
// Use esm.sh for Deno
const pathMap = Object.fromEntries(
  Object.entries(versionInfo).map(([key, value]) => [
    key,
    value.path || `https://esm.sh/${key}@${value.version}`,
  ]),
);

function node2deno(files) {
  const rewritePath = (value, state) => {
    const { root, filename } = state.file.opts;
    const currentDir = dirname(relative(root, filename));
    if (value.startsWith('@/')) {
      value = relative(currentDir, value.slice(2));
      if (!value.startsWith('.')) value = `./${value}`;
    }
    if (value.startsWith('.')) {
      if (!value.endsWith('.ts')) {
        const relpath = normalize(join(currentDir, value));
        if (files.includes(`${relpath}/index.ts`)) {
          value += '/index.ts';
        } else {
          value += '.ts';
        }
      }
    } else {
      const pkgName = value
        .split('/')
        .slice(0, value.startsWith('@') + 1)
        .join('/');
      const prefix = pathMap[pkgName];
      if (!prefix) throw new Error(`Package not found: ${pkgName}`);
      value = prefix + value.slice(pkgName.length);
    }
    return value;
  };
  return {
    name: 'node2deno',
    visitor: {
      ImportDeclaration(path, state) {
        const { source } = path.node;
        if (source) source.value = rewritePath(source.value, state);
      },
      ExportAllDeclaration(path, state) {
        const { source } = path.node;
        if (source) source.value = rewritePath(source.value, state);
      },
      ExportNamedDeclaration(path, state) {
        const { source } = path.node;
        if (source) source.value = rewritePath(source.value, state);
      },
      CallExpression(path, state) {
        if (path.node.callee.type !== 'Import') return;
        const [source] = path.get('arguments');
        source.node.value = rewritePath(source.node.value, state);
      },
    },
  };
}

async function main() {
  const files = await globby(['**/*.ts', '!*.d.ts', '!**/deprecated/**'], {
    cwd: 'src',
  });
  await Promise.all(
    files.map(async (file) => {
      let content = await readFile(join('src', file), 'utf8');
      content = content.replace(/__versions__.(\w+)/g, (_, g) =>
        JSON.stringify(versionMap[g]),
      );
      const transformed = await transformAsync(content, {
        filename: file,
        plugins: [tsSyntax, node2deno(files)],
      });
      const outFile = join(dist, file);
      await mkdir(dirname(outFile), { recursive: true });
      await writeFile(outFile, transformed.code, 'utf8');
    }),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
