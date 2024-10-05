import { b64decode, b64encode, decodeText, encodeText } from "../../base64.ts";
import { loadJS } from "../../util.ts";
import { once } from "https://cdn.jsdelivr.net/npm/es-toolkit@1.23.0/+esm";
import { definePlugin } from "./base.ts";
const loadVega = once(() => loadJS(`https://cdn.jsdelivr.net/combine/npm/vega@${"5.30.0"},npm/vega-lite@${"5.21.0"},npm/vega-embed@${"6.26.0"}`));
export default definePlugin({
  name: 'vega',
  markdown: (_md, {
    enableFeature,
    highlighters
  }) => {
    highlighters.vega = content => {
      loadVega();
      enableFeature();
      const base64 = b64encode(encodeText(JSON.stringify(JSON.parse(content))));
      return `<div data-vega="${base64}"></div>`;
    };
  },
  onMounted: async (el: HTMLElement) => {
    await loadVega();
    el.querySelectorAll<HTMLElement>('[data-vega]').forEach(wrapper => {
      const base64 = wrapper.dataset.vega || '';
      const data = JSON.parse(decodeText(b64decode(base64)));
      wrapper.removeAttribute('data-vega');
      const child = document.createElement('div');
      child.style.width = '100%';
      wrapper.append(child);
      window.vegaEmbed(child, data);
    });
  }
});