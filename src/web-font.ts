export async function webFont(options?: { config?: any; fontFamily?: string }) {
  const { default: WebFont } = await import('webfontloader');
  WebFont.load(options?.config);
  if (options?.fontFamily) {
    injectStyle(`*{font-family:${options.fontFamily}}`);
  }
}

function injectStyle(css: string) {
  const el = document.createElement('style');
  el.textContent = css;
  document.head.append(el);
  return el;
}

const wf = window.__jslib?.webFont;
if (wf) {
  const options = {
    fontFamily: '"Roboto Slab",serif',
    ...wf,
    config: {
      google: {
        families: ['Roboto Slab'],
        display: 'swap',
      },
      ...wf.config,
    },
  };
  webFont(options);
}
