import type { Remarkable as IRemarkable } from "https://esm.sh/remarkable@2.0.1";
import type { IMarkdownData } from "../types.ts";
import { memoize } from "../util.ts";
import { type IRenderPlugin, builtInPlugins, pluginPreload, pluginMounted } from "./plugins/index.ts";
export const loadRemarkable = memoize(async () => {
  const {
    Remarkable
  } = await import("https://esm.sh/remarkable@2.0.1");
  return Remarkable;
});
export class MarkdownRenderer {
  private features: Record<string, boolean> = {};
  static async create(plugins = builtInPlugins) {
    const [Remarkable] = await Promise.all([loadRemarkable(), pluginPreload(plugins)]);
    const md = new Remarkable('full');
    return new MarkdownRenderer(plugins, md);
  }
  constructor(public plugins: IRenderPlugin[], private md: IRemarkable) {
    this.md.set({
      html: true,
      breaks: true
    });
    plugins.forEach(({
      name,
      remarkable
    }) => {
      if (remarkable) this.md.use(remarkable, {
        enableFeature: () => this.enableFeature(name)
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
export const getRenderer = memoize(() => MarkdownRenderer.create());
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
      frontmatter = (load(raw) as Record<string, unknown>);
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