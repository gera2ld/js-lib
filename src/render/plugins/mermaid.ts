import { memoize } from '@/loader';
import { definePlugin } from './base';

const loadMermaid = memoize(async () => {
  const { default: mermaid } = await import('mermaid');
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  mermaid.initialize({
    startOnLoad: false,
    theme: query.matches ? 'dark' : 'default',
  });
  return mermaid;
});

export default definePlugin({
  name: 'mermaid',
  onMounted: async (el) => {
    const nodes = Array.from(
      el.querySelectorAll<HTMLElement>('pre code.language-mermaid'),
    );
    const mermaid = await loadMermaid();
    await mermaid.run({
      nodes,
    });
  },
});
