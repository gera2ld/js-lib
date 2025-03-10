import { once } from 'es-toolkit';
import { definePlugin } from '../base';
import { handleMarkdown } from './common';

const loadMermaid = once(async () => {
  const { default: mermaid } = await import('mermaid');
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  mermaid.initialize({
    startOnLoad: false,
    theme: query.matches ? 'dark' : 'default',
  });
  return mermaid;
});

async function handleMounted(el: HTMLElement) {
  const nodes = el.querySelectorAll<HTMLElement>('pre.mermaid');
  if (!nodes.length) return;
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
