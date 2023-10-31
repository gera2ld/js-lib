import { fetchBlob, loadJS, memoize, wrapFunction } from './loader';
import { IMarkdownPlugin } from './types';

const prefix = 'https://cdn.jsdelivr.net/npm/';
const version = __versions__.hljs;

async function loadCSS() {
  const [dark, light] = await Promise.all(
    ['tokyo-night-dark', 'tokyo-night-light'].map((theme) =>
      fetchBlob(
        `${prefix}@highlightjs/cdn-assets@${version}/styles/${theme}.min.css`,
      ).then((blob) => blob.text()),
    ),
  );
  const css = `\
@media (prefers-color-scheme: dark) {
  ${dark}
}
@media (prefers-color-scheme: light) {
  ${light}
}`;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.append(style);
}

export const loadHljs = memoize(async () => {
  loadCSS();
  await loadJS(`${prefix}@highlightjs/cdn-assets@${version}/highlight.min.js`);
  return window.hljs;
});

export function loadPluginHljs(): IMarkdownPlugin {
  return {
    name: 'hljs',
    plugin: (md, { enableFeature }) => {
      md.renderer.rules.fence = wrapFunction(
        md.renderer.rules.fence,
        function wrapped(fence, ...args) {
          loadHljs();
          enableFeature();
          return fence.apply(this, args);
        },
      );
    },
    onMounted: async (el: HTMLElement) => {
      const hljs = await loadHljs();
      el.querySelectorAll<HTMLElement>('pre code').forEach((code) => {
        hljs.highlightElement(code);
      });
    },
  };
}
