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

setTimeout(initialize);
