import { once } from 'es-toolkit';
import { loadCSS, loadJS } from './util';

export const initialize = once(
  async (
    unocssOptions?: any,
    initOptions?: {
      reset?: string;
    },
  ) => {
    let reset = initOptions?.reset ?? 'normalize';
    if (reset) {
      if (!reset.includes('://'))
        reset = `https://cdn.jsdelivr.net/npm/@unocss/reset@${__versions__.unocssReset}/${reset}.min.css`;
      loadCSS(reset);
    }

    if (unocssOptions) window.__unocss = unocssOptions;
    return loadJS(
      `https://cdn.jsdelivr.net/npm/@unocss/runtime@${__versions__.unocssRuntime}`,
    );
  },
);

async function transformTokens(tokens: string[]) {
  await initialize();
  const { uno } = window.__unocss_runtime;
  // Copied from @unocss/postcss
  const styles = (await Promise.all(tokens.map((i) => uno.parseToken(i, '-'))))
    .filter(Boolean)
    .flat()
    .sort((a, b) => a[0] - b[0])
    .sort(
      (a, b) =>
        (a[3] ? uno.parentOrders.get(a[3]) ?? 0 : 0) -
        (b[3] ? uno.parentOrders.get(b[3]) ?? 0 : 0),
    )
    .reduce<Record<string, string>>(
      (acc, item) => {
        const key = `${item[1]}\n${item[3] || ''}`;
        acc[key] = (acc[key] || '') + item[2];
        return acc;
      },
      {} as Record<string, string>,
    );
  return styles;
}

async function buildCSSItem(selector: string, tokenStr: string) {
  const styles = await transformTokens(tokenStr.split(' ').filter(Boolean));
  return Object.entries(styles).map(([key, css]) => {
    const [rawSelector, parent] = key.split('\n');
    const newSelector = rawSelector
      .replace(/\s\$\$\s+/g, ' ')
      .replace(/\.\\-(?:[^-\w]|$)/g, selector);
    css = `${newSelector}{${css}}`;
    if (parent) css = `${parent}{${css}}`;
    return css;
  });
}

export async function buildCSSFromShortcuts(shortcuts: Record<string, string>) {
  const items = await Promise.all(
    Object.entries(shortcuts).map(([selector, tokenStr]) =>
      buildCSSItem(selector, tokenStr),
    ),
  );
  return items.flat().join('\n');
}

export async function injectStyleByShortcuts(
  shortcuts: Record<string, string>,
) {
  const css = await buildCSSFromShortcuts(shortcuts);
  const el = document.createElement('style');
  el.textContent = css;
  document.head.append(el);
  return el;
}

setTimeout(initialize);
