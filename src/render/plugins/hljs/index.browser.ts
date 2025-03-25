import { loadJS } from '@/util';
import { simpleRequest } from 'common-lib/src/http/request.ts';
import { once } from 'es-toolkit';
import type { HLJSApi } from 'highlight.js';
import { definePlugin, patchHighlight } from '../base';
import { IRenderPlugin } from '../types';
import { initialize } from './common';

const prefix = 'https://cdn.jsdelivr.net/npm/';
const version = __versions__.highlightjsCdnAssets;

const loadHljsCss = once(async () => {
  const [dark, light] = await Promise.all(
    ['tokyo-night-dark', 'tokyo-night-light'].map((theme) =>
      simpleRequest(
        `${prefix}@highlightjs/cdn-assets@${version}/styles/${theme}.min.css`,
      ).text(),
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
  await loadHljs();
};

const handleMarkdown: IRenderPlugin['markdown'] = (md, { enableFeature }) => {
  patchHighlight(md, () => {
    enableFeature();
    return '';
  });
};

const handleMounted = async (el: HTMLElement) => {
  loadHljsCss();
  const nodes = el.querySelectorAll<HTMLElement>('pre>code');
  if (!nodes.length) return;
  const hljs = await loadHljs();
  nodes.forEach((code) => {
    hljs.highlightElement(code);
  });
};

export default definePlugin({
  name: 'hljs',
  preload: handlePreload,
  markdown: handleMarkdown,
  onMounted: handleMounted,
});
