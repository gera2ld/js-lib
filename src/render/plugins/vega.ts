import { b64decodeText, b64encodeText } from '@/base64';
import { loadJS } from '@/loader';
import { memoize } from '@/util';
import { definePlugin } from './base';

const loadVega = memoize(() =>
  loadJS(
    `https://cdn.jsdelivr.net/combine/npm/vega@${__versions__.vega},npm/vega-lite@${__versions__.vegaLite},npm/vega-embed@${__versions__.vegaEmbed}`,
  ),
);

export default definePlugin({
  name: 'vega',
  remarkable: (md, { enableFeature }) => {
    md.renderer.rules.fence_custom.vega = (tokens, idx) => {
      loadVega();
      enableFeature();
      const { content } = tokens[idx];
      const base64 = b64encodeText(JSON.stringify(JSON.parse(content)));
      return `<div data-vega="${base64}"></div>`;
    };
  },
  onMounted: async (el: HTMLElement) => {
    await loadVega();
    el.querySelectorAll<HTMLElement>('[data-vega]').forEach((wrapper) => {
      const base64 = wrapper.dataset.vega || '';
      const data = JSON.parse(b64decodeText(base64));
      wrapper.removeAttribute('data-vega');
      const child = document.createElement('div');
      child.style.width = '100%';
      wrapper.append(child);
      window.vegaEmbed(child, data);
    });
  },
});
