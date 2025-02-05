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
  const { hljs } = window;
  registerVue(hljs);
  return hljs;
});

function registerVue(hljs: typeof window.hljs) {
  // Credits: https://github.com/highlightjs/highlightjs-vue/blob/master/vue.js
  hljs.registerLanguage(
    'vue',
    function hljsDefineVue(hljs: typeof window.hljs) {
      return {
        subLanguage: 'xml',
        contains: [
          hljs.COMMENT('<!--', '-->', {
            relevance: 10,
          }),
          {
            begin: /^(\s*)(<script>)/gm,
            end: /^(\s*)(<\/script>)/gm,
            subLanguage: 'javascript',
            excludeBegin: true,
            excludeEnd: true,
          },
          {
            begin: /^(?:\s*)(?:<script\s+lang=(["'])ts\1>)/gm,
            end: /^(\s*)(<\/script>)/gm,
            subLanguage: 'typescript',
            excludeBegin: true,
            excludeEnd: true,
          },
          {
            begin: /^(\s*)(<style(\s+scoped)?>)/gm,
            end: /^(\s*)(<\/style>)/gm,
            subLanguage: 'css',
            excludeBegin: true,
            excludeEnd: true,
          },
          {
            begin:
              /^(?:\s*)(?:<style(?:\s+scoped)?\s+lang=(["'])(?:s[ca]ss)\1(?:\s+scoped)?>)/gm,
            end: /^(\s*)(<\/style>)/gm,
            subLanguage: 'scss',
            excludeBegin: true,
            excludeEnd: true,
          },
          {
            begin:
              /^(?:\s*)(?:<style(?:\s+scoped)?\s+lang=(["'])stylus\1(?:\s+scoped)?>)/gm,
            end: /^(\s*)(<\/style>)/gm,
            subLanguage: 'stylus',
            excludeBegin: true,
            excludeEnd: true,
          },
        ],
      };
    },
  );
}

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
