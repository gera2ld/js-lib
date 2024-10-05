import { once } from "https://cdn.jsdelivr.net/npm/es-toolkit@1.23.0/+esm";
import { definePlugin } from "./base.ts";
const loadMermaid = once(async () => {
  const {
    default: mermaid
  } = await import("https://cdn.jsdelivr.net/npm/mermaid@11.3.0/dist/mermaid.esm.min.mjs");
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  mermaid.initialize({
    startOnLoad: false,
    theme: query.matches ? 'dark' : 'default'
  });
  return mermaid;
});
export default definePlugin({
  name: 'mermaid',
  onMounted: async el => {
    const nodes = Array.from(el.querySelectorAll<HTMLElement>('pre code.language-mermaid'));
    const mermaid = await loadMermaid();
    await mermaid.run({
      nodes
    });
  }
});