import { once } from 'es-toolkit';
import { loadJS } from '../../../../lib/util/index.browser.ts';
import { definePlugin } from '../base';
import { handleMarkdown } from './common';

const loadVega = once(() =>
  loadJS(
    `https://cdn.jsdelivr.net/combine/npm/vega@${__versions__.vega},npm/vega-lite@${__versions__.vegaLite},npm/vega-embed@${__versions__.vegaEmbed}`,
  ),
);

async function handleMounted(el: HTMLElement) {
  const nodes = el.querySelectorAll<HTMLElement>('.vega:not([data-processed])');
  if (!nodes.length) return;
  await loadVega();
  nodes.forEach((wrapper) => {
    const data = wrapper.textContent;
    wrapper.dataset.processed = 'true';
    const child = document.createElement('div');
    child.style.width = '100%';
    wrapper.append(child);
    window.vegaEmbed(child, data);
  });
}

export default definePlugin({
  name: 'vega',
  markdown: handleMarkdown,
  onMounted: handleMounted,
});
