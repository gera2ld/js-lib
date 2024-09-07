import type WebFont from 'webfontloader';

interface IWebFontOptions {
  config: WebFont.Config;
  fontFamily?: string;
}

export async function webFont(options: IWebFontOptions) {
  const { default: WebFont } = await import('webfontloader');
  WebFont.load(options.config);
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

let initialized = false;

export function initialize(options: IWebFontOptions) {
  if (initialized) return;
  initialized = true;
  webFont(options);
}

setTimeout(() => {
  const wf = window.__jslib?.webFont;
  const options = {
    fontFamily: '"Roboto Slab",serif',
    ...wf,
    config: {
      google: {
        families: ['Roboto Slab'],
        display: 'swap',
      },
      ...wf?.config,
    },
  };
  initialize(options);
});
