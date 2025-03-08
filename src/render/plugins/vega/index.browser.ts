import { b64decode, b64encode, decodeText, encodeText } from '@/base64';
import { loadJS } from '@/util';
import { once } from 'es-toolkit';
import { definePlugin, patchHighlight } from '../base';

const loadVega = once(() =>
  loadJS(
    `https://cdn.jsdelivr.net/combine/npm/vega@${__versions__.vega},npm/vega-lite@${__versions__.vegaLite},npm/vega-embed@${__versions__.vegaEmbed}`,
  ),
);

async function handleMounted(el: HTMLElement) {
  await loadVega();
  el.querySelectorAll<HTMLElement>('[data-vega]').forEach((wrapper) => {
    const base64 = wrapper.dataset.vega || '';
    const data = JSON.parse(decodeText(b64decode(base64)));
    wrapper.removeAttribute('data-vega');
    const child = document.createElement('div');
    child.style.width = '100%';
    wrapper.append(child);
    window.vegaEmbed(child, data);
  });
}

export default definePlugin({
  name: 'vega',
  markdown: (md, { enableFeature }) => {
    patchHighlight(md, (content: string, lang: string, _attrs: string) => {
      if (lang === 'vega') {
        enableFeature();
        const base64 = b64encode(
          encodeText(JSON.stringify(JSON.parse(content))),
        );
        return `<div data-vega="${base64}"></div>`;
      }
      return '';
    });
  },
  onMounted: handleMounted,
});
