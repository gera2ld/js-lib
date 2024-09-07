import { fetchBlob, loadJS } from '@/util';
import { once } from 'es-toolkit';
import { definePlugin } from './base';

const prefix = 'https://cdn.jsdelivr.net/npm/';
const version = __versions__.highlightjsCdnAssets;

const loadCSS = once(async () => {
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

const loadHljs = once(async () => {
  await loadJS(`${prefix}@highlightjs/cdn-assets@${version}/highlight.min.js`);
  return window.hljs;
});

export default definePlugin({
  name: 'hljs',
  preload: loadCSS,
  markdown: (_md, { enableFeature, highlighters }) => {
    highlighters.default = () => {
      loadHljs();
      enableFeature();
      return '';
    };
  },
  onMounted: async (el: HTMLElement) => {
    const hljs = await loadHljs();
    el.querySelectorAll<HTMLElement>('pre code').forEach((code) => {
      hljs.highlightElement(code);
    });
  },
});
