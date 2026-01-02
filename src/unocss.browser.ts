import { loadJS } from './lib/util/index.browser.ts';

interface IUnocssOptions {
  unocss?: any;
  prepare?: (
    defaultPrepare?: (options?: IUnocssOptions) => Promise<void>,
  ) => Promise<void>;
}

async function defaultPrepare(options?: IUnocssOptions) {
  await Promise.all([
    loadJS(
      `https://cdn.jsdelivr.net/npm/@unocss/runtime@${__versions__.unocssRuntime}/preset-wind4.global.js`,
    ),
    loadJS(
      `https://cdn.jsdelivr.net/npm/@unocss/runtime@${__versions__.unocssRuntime}/preset-icons.global.js`,
    ),
  ]);
  window.__unocss = {
    presets: [
      () => window.__unocss_runtime.presets.presetWind4(),
      () =>
        window.__unocss_runtime.presets.presetIcons({
          scale: 1.2,
          cdn: 'https://esm.sh/',
        }),
    ],
    ...window.__unocss,
    ...options?.unocss,
  };
}

async function doInitialize(options?: IUnocssOptions) {
  await (options?.prepare
    ? options.prepare(defaultPrepare)
    : defaultPrepare(options));
  await loadJS(
    `https://cdn.jsdelivr.net/npm/@unocss/runtime@${__versions__.unocssRuntime}/core.global.js`,
  );
}

let initialized: Promise<void>;

export function initialize(options?: IUnocssOptions) {
  initialized ||= doInitialize(options);
  return initialized;
}

// async function transformTokens(tokens: string[]) {
//   await initialize();
//   const { uno } = window.__unocss_runtime;
//   // Copied from @unocss/postcss
//   const styles = (await Promise.all(tokens.map((i) => uno.parseToken(i, '-'))))
//     .filter(Boolean)
//     .flat()
//     .sort((a, b) => a[0] - b[0])
//     .sort(
//       (a, b) =>
//         (a[3] ? (uno.parentOrders.get(a[3]) ?? 0) : 0) -
//         (b[3] ? (uno.parentOrders.get(b[3]) ?? 0) : 0),
//     )
//     .reduce<Record<string, string>>(
//       (acc, item) => {
//         const key = `${item[1]}\n${item[3] || ''}`;
//         acc[key] = (acc[key] || '') + item[2];
//         return acc;
//       },
//       {} as Record<string, string>,
//     );
//   return styles;
// }

// async function buildCSSItem(selector: string, tokenStr: string) {
//   const styles = await transformTokens(tokenStr.split(' ').filter(Boolean));
//   return Object.entries(styles).map(([key, css]) => {
//     const [rawSelector, parent] = key.split('\n');
//     const newSelector = rawSelector
//       .replace(/\s\$\$\s+/g, ' ')
//       .replace(/\.\\-(?:[^-\w]|$)/g, selector);
//     css = `${newSelector}{${css}}`;
//     if (parent) css = `${parent}{${css}}`;
//     return css;
//   });
// }
//
// export async function buildCSSFromShortcuts(shortcuts: Record<string, string>) {
//   const items = await Promise.all(
//     Object.entries(shortcuts).map(([selector, tokenStr]) =>
//       buildCSSItem(selector, tokenStr),
//     ),
//   );
//   return items.flat().join('\n');
// }

// export async function injectStyleByShortcuts(
//   shortcuts: Record<string, string>,
// ) {
//   const css = await buildCSSFromShortcuts(shortcuts);
//   const el = document.createElement('style');
//   el.textContent = css;
//   document.head.append(el);
//   return el;
// }

setTimeout(initialize);
