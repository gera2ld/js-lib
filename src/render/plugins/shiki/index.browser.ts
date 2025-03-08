import { once } from 'es-toolkit';
import { definePlugin, patchHighlight } from '../base';
import { IRenderPlugin } from '../types';
import { shikiOptions } from './common';

const loadShikiCss = once(() => {
  const css = `\
@media (prefers-color-scheme: dark) {
  .shiki,
  .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    /* Optional, if you also want font styles */
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }
}`;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.append(style);
});

const loadShikiJs = once(async () => {
  const { codeToHtml } = await import('shiki');
  return codeToHtml;
});

const handlePreload = async () => {
  loadShikiCss();
  await loadShikiJs();
};

const handleMarkdown: IRenderPlugin['markdown'] = (md, { enableFeature }) => {
  patchHighlight(md, () => {
    enableFeature();
    return '';
  });
};

const handleMounted = async (el: HTMLElement) => {
  const codeToHtml = await loadShikiJs();
  el.querySelectorAll<HTMLElement>('pre:not(.shiki)>code').forEach(
    async (code) => {
      const pre = code.parentNode as HTMLPreElement;
      const lang = code.className.match(/^language-(\S+)$/)?.[1];
      const content = code.textContent;
      if (!pre || !lang || !content) return;
      pre.classList.add('shiki');
      let html: string;
      try {
        html = await codeToHtml(content, {
          lang,
          ...shikiOptions,
        });
      } catch {
        html = await codeToHtml(content, {
          lang: 'text',
          ...shikiOptions,
        });
      }
      const div = document.createElement('div');
      div.innerHTML = html;
      const newPre = div.firstElementChild;
      if (newPre?.tagName === 'PRE' && newPre.classList.contains('shiki')) {
        pre.replaceWith(newPre);
      }
    },
  );
};

export default definePlugin({
  name: 'shiki',
  preload: handlePreload,
  markdown: handleMarkdown,
  onMounted: handleMounted,
});
