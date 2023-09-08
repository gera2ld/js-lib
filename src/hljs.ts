import { fetchBlob, loadJS, wrapFunction } from './loader';
import { IMarkdownPlugin } from './types';

const prefix = 'https://cdn.jsdelivr.net/npm/';

let loading: ReturnType<typeof loadHljsOnce>;

async function loadCSS() {
  const [dark, light] = await Promise.all(
    ['tokyo-night-dark', 'tokyo-night-light'].map((theme) =>
      fetchBlob(
        `${prefix}@highlightjs/cdn-assets@11.8.0/styles/${theme}.min.css`
      ).then((blob) => blob.text())
    )
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

async function loadHljsOnce() {
  loadCSS();
  await loadJS(`${prefix}@highlightjs/cdn-assets@11.8.0/highlight.min.js`);
  return window.hljs;
}

export function loadHljs() {
  loading ||= loadHljsOnce();
  return loading;
}

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
        }
      );
    },
    onMounted: async (el: HTMLElement) => {
      const hljs = await loading;
      el.querySelectorAll<HTMLElement>('pre code').forEach((code) => {
        hljs.highlightElement(code);
      });
    },
  };
}
