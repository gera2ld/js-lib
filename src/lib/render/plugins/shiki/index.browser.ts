import { once } from 'es-toolkit';
import { definePlugin, patchHighlight } from '../base';
import { IRenderPlugin } from '../types';
import { shikiCss, shikiOptions } from './common';

const loadShikiCss = once(() => {
  const style = document.createElement('style');
  style.textContent = shikiCss;
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
  loadShikiCss();
  const nodes = el.querySelectorAll<HTMLElement>('pre:not(.shiki)>code');
  if (!nodes.length) return;
  const codeToHtml = await loadShikiJs();
  nodes.forEach(async (code) => {
    const pre = code.parentNode as HTMLPreElement;
    const lang = code.className.match(/^language-(\S+)$/)?.[1];
    const content = code.textContent;
    if (!pre || !lang || !content) return;
    pre.classList.add('shiki');
    let html: string;
    try {
      html = await codeToHtml(content, {
        ...shikiOptions,
        lang,
      });
    } catch {
      html = await codeToHtml(content, shikiOptions);
    }
    const div = document.createElement('div');
    div.innerHTML = html;
    const newPre = div.firstElementChild;
    if (newPre?.tagName === 'PRE' && newPre.classList.contains('shiki')) {
      pre.replaceWith(newPre);
    }
  });
};

export default definePlugin({
  name: 'shiki',
  preload: handlePreload,
  markdown: handleMarkdown,
  onMounted: handleMounted,
});
