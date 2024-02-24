import { b64decodeText, b64encodeText } from "../../base64.ts";
import { loadJS, memoize } from "../../util.ts";
import { definePlugin } from "./base.ts";
const loadVega = memoize(() => loadJS(`https://cdn.jsdelivr.net/combine/npm/vega@${"5.27.0"},npm/vega-lite@${"5.16.3"},npm/vega-embed@${"6.24.0"}`));
export default definePlugin({
  name: 'vega',
  remarkable: (md, {
    enableFeature
  }) => {
    md.renderer.rules.fence_custom.vega = (tokens, idx) => {
      loadVega();
      enableFeature();
      const {
        content
      } = tokens[idx];
      const base64 = b64encodeText(JSON.stringify(JSON.parse(content)));
      return `<div data-vega="${base64}"></div>`;
    };
  },
  onMounted: async (el: HTMLElement) => {
    await loadVega();
    el.querySelectorAll<HTMLElement>('[data-vega]').forEach(wrapper => {
      const base64 = wrapper.dataset.vega || '';
      const data = JSON.parse(b64decodeText(base64));
      wrapper.removeAttribute('data-vega');
      const child = document.createElement('div');
      child.style.width = '100%';
      wrapper.append(child);
      window.vegaEmbed(child, data);
    });
  }
});