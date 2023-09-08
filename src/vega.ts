import { b64decodeText, b64encodeText } from './base64';
import { loadJS } from './loader';
import { IMarkdownPlugin } from './types';

let loading: Promise<void>;

async function loadVegaOnce() {
  await loadJS(
    'https://cdn.jsdelivr.net/combine/npm/vega@5.25.0,npm/vega-lite@5.12.0,npm/vega-embed@6.22.1'
  );
}

function loadVega() {
  loading ||= loadVegaOnce();
  return loading;
}

export function loadPluginVega(): IMarkdownPlugin {
  loadVega();
  return {
    plugin: (md) => {
      md.renderer.rules.fence_custom.vega = (tokens, idx) => {
        const { content } = tokens[idx];
        const base64 = b64encodeText(JSON.stringify(JSON.parse(content)));
        return `<div data-vega="${base64}"></div>`;
      };
    },
    postrender: async (el: HTMLElement) => {
      await loading;
      el.querySelectorAll<HTMLElement>('[data-vega]').forEach((wrapper) => {
        const base64 = wrapper.dataset.vega;
        const data = JSON.parse(b64decodeText(base64));
        wrapper.removeAttribute('data-vega');
        const child = document.createElement('div');
        child.style.width = '100%';
        wrapper.append(child);
        (window as any).vegaEmbed(child, data);
      });
    },
  };
}
