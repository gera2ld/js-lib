import { fetchBlob, loadJS, memoize, wrapFunction } from '@/util';
import { definePlugin } from './base';

const prefix = 'https://cdn.jsdelivr.net/npm/';
const version = __versions__.hljs;

const loadCSS = memoize(async () => {
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
});

const loadHljs = memoize(async () => {
  await loadJS(`${prefix}@highlightjs/cdn-assets@${version}/highlight.min.js`);
  return window.hljs;
});

export default definePlugin({
  name: 'hljs',
  preload: loadCSS,
  remarkable: (md, { enableFeature }) => {
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
});
