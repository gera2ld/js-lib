import { fetchBlob, loadJS } from '@/util';
import { once } from 'es-toolkit';
import type { HLJSApi } from 'highlight.js';
import { definePlugin } from '../base';
import type { IRenderPlugin } from '../types';
import { initialize } from './common';

const prefix = 'https://cdn.jsdelivr.net/npm/';
const version = __versions__.highlightjsCdnAssets;

const loadHljsCss = once(async () => {
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
  const hljs = window.hljs as HLJSApi;
  return initialize(hljs);
});

const handlePreload = async () => {
  // No need to wait
  loadHljsCss();
};

const handleMounted = async (el: HTMLElement) => {
  const hljs = await loadHljs();
  el.querySelectorAll<HTMLElement>('pre code').forEach((code) => {
    hljs.highlightElement(code);
  });
};

const handleMarkdown: IRenderPlugin['markdown'] = (
  _md,
  { enableFeature, highlighters },
) => {
  highlighters.default = () => {
    enableFeature();
    return '';
  };
};

export default definePlugin({
  name: 'hljs',
  preload: handlePreload,
  markdown: handleMarkdown,
  onMounted: handleMounted,
});
