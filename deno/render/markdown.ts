import type { IMarkdownData } from "../types.ts";
import { once } from "https://cdn.jsdelivr.net/npm/es-toolkit@1.27.0/+esm";
import type MarkdownIt from "https://esm.sh/markdown-it@14.1.0";
import { builtInPlugins, pluginMounted, pluginPreload, type IRenderPlugin } from "./plugins/index.ts";
export const loadMarkdownIt = once(async () => import("./markdown-it.ts"));
export class MarkdownRenderer {
  private features: Record<string, boolean> = {};
  static async create(plugins = builtInPlugins) {
    const [{
      md,
      highlighters
    }] = await Promise.all([loadMarkdownIt(), pluginPreload(plugins)]);
    return new MarkdownRenderer(plugins, md, highlighters);
  }
  constructor(public plugins: IRenderPlugin[], private md: MarkdownIt, highlighters: Record<string, (code: string) => string>) {
    plugins.forEach(({
      name,
      markdown
    }) => {
      if (markdown) this.md.use(markdown, {
        enableFeature: () => this.enableFeature(name),
        highlighters
      });
    });
  }
  private enableFeature(name: string) {
    this.features[name] = true;
  }
  render(source: string) {
    this.features = {};
    const html = this.md.render(source);
    const enabledPlugins = this.plugins.filter(({
      name,
      always
    }) => always || this.features[name]);
    return {
      html,
      plugins: enabledPlugins,
      onMounted: (el: HTMLElement) => pluginMounted(el, enabledPlugins)
    };
  }
  process(el: HTMLElement) {
    pluginMounted(el, this.plugins);
  }
}
export const getRenderer = once(() => MarkdownRenderer.create());
export async function renderMarkdown({
  content
}: IMarkdownData, el?: HTMLElement) {
  const renderer = await getRenderer();
  const {
    html,
    onMounted
  } = renderer.render(content);
  if (el) {
    el.innerHTML = html;
    onMounted(el);
  }
}
export async function parseFrontmatter(content: string): Promise<IMarkdownData> {
  let frontmatter: Record<string, unknown> | undefined;
  const endOffset = content.startsWith('---\n') ? content.indexOf('\n---\n') : -1;
  if (endOffset > 0) {
    const raw = content.slice(4, endOffset);
    const {
      load
    } = await import("https://esm.sh/js-yaml@4.1.0");
    try {
      frontmatter = load(raw) as Record<string, unknown>;
    } catch {
      // noop
    }
    const offset = endOffset + 5;
    content = content.slice(offset);
  }
  return {
    content,
    frontmatter
  };
}