import { type IRenderPlugin, pluginMounted } from '../plugins';
import type { IMarkdownData } from '../types';
import { MarkdownRenderer as BaseMarkdownRenderer } from './base';

export { loadMarkdownIt, parseFrontmatter } from './base';

export class MarkdownRenderer extends BaseMarkdownRenderer {
  process(el: HTMLElement, plugins: IRenderPlugin[] = this.plugins) {
    pluginMounted(el, plugins);
  }
}

export async function renderMarkdown(
  { content }: IMarkdownData,
  el: HTMLElement,
) {
  const renderer = await MarkdownRenderer.create();
  const { html, onMounted } = renderer.render(content);
  if (el) {
    el.innerHTML = html;
    onMounted(el);
  }
}
