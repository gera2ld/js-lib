import { safeHtml } from '@/util';
import { once } from 'es-toolkit';
import { definePlugin, patchHighlight } from '../base';
import { IRenderPlugin } from '../types';

const loadMermaid = once(async () => {
  const { default: mermaid } = await import('mermaid');
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  mermaid.initialize({
    startOnLoad: false,
    theme: query.matches ? 'dark' : 'default',
  });
  return mermaid;
});

const handleMarkdown: IRenderPlugin['markdown'] = (md, { enableFeature }) => {
  patchHighlight(md, (code, lang) => {
    if (lang === 'mermaid') {
      enableFeature();
      return '<pre class="mermaid">' + safeHtml(code) + '</pre>';
    }
    return '';
  });
};

async function handleMounted(el: HTMLElement) {
  const nodes = Array.from(el.querySelectorAll<HTMLElement>('pre.mermaid'));
  const mermaid = await loadMermaid();
  await mermaid.run({
    nodes,
  });
}

export default definePlugin({
  name: 'mermaid',
  markdown: handleMarkdown,
  onMounted: handleMounted,
});
