import { loadCSS, loadJS, memoize } from './loader';

export const initialize = memoize(
  async (
    unocssOptions?: any,
    initOptions?: {
      reset?: string;
    },
  ) => {
    let reset = initOptions?.reset ?? 'normalize';
    if (reset) {
      if (!reset.includes('://'))
        reset = `https://cdn.jsdelivr.net/npm/@unocss/reset/${reset}.min.css`;
      loadCSS(reset);
    }

    if (unocssOptions) (window as any).__unocss = unocssOptions;
    return loadJS('https://cdn.jsdelivr.net/npm/@unocss/runtime');
  },
);

async function transformTokens(tokens: string[]) {
  await initialize();
  const { uno } = (window as any).__unocss_runtime;
  // Copied from @unocss/postcss
  const style = (await Promise.all(tokens.map((i) => uno.parseToken(i, '-'))))
    .filter(Boolean)
    .flat()
    .sort((a, b) => a[0] - b[0])
    .sort(
      (a, b) =>
        (a[3] ? uno.parentOrders.get(a[3]) ?? 0 : 0) -
        (b[3] ? uno.parentOrders.get(b[3]) ?? 0 : 0),
    )
    .map((a) => a[2])
    .join('');
  return style;
}

async function buildCSSItem(selector: string, tokenStr: string) {
  const style = await transformTokens(tokenStr.split(' ').filter(Boolean));
  return `${selector}{${style}}`;
}

export async function buildCSS(shortcuts: Record<string, string>) {
  const items = await Promise.all(
    Object.entries(shortcuts).map(([selector, tokenStr]) =>
      buildCSSItem(selector, tokenStr),
    ),
  );
  return items.join('');
}

export async function injectStyle(shortcuts: Record<string, string>) {
  const css = await buildCSS(shortcuts);
  const el = document.createElement('style');
  el.textContent = css;
  document.head.append(el);
  return el;
}

setTimeout(initialize);
