import { noop, once } from 'es-toolkit';
import type MarkdownIt from 'markdown-it';
import { builtInPlugins, pluginPreload, type IRenderPlugin } from '../plugins';
import type { IMarkdownData } from '../types';

export const loadMarkdownIt = once(async () => import('./markdown-it'));

export class MarkdownRenderer {
  private features: Record<string, boolean> = {};

  static async create(plugins = builtInPlugins) {
    const [{ initMarkdownIt }] = await Promise.all([
      loadMarkdownIt(),
      pluginPreload(plugins),
    ]);
    return new this(plugins, initMarkdownIt());
  }

  constructor(
    public plugins: IRenderPlugin[],
    private md: MarkdownIt,
  ) {
    plugins.forEach(({ name, markdown }) => {
      if (markdown)
        this.md.use(markdown, {
          enableFeature: () => this.enableFeature(name),
        });
    });
  }

  private enableFeature(name: string) {
    this.features[name] = true;
  }

  render(source: string) {
    this.features = {};
    const html = this.md.render(source);
    const enabledPlugins = this.plugins.filter(
      ({ name, always }) => always || this.features[name],
    );
    return {
      html,
      plugins: enabledPlugins,
      onMounted: (el: HTMLElement) => this.process(el, enabledPlugins),
    };
  }

  process(el: HTMLElement, plugins: IRenderPlugin[] = this.plugins) {}
}

export async function parseFrontmatter(
  content: string,
): Promise<IMarkdownData> {
  let frontmatter: Record<string, unknown> | undefined;
  const endOffset = content.startsWith('---\n')
    ? content.indexOf('\n---\n')
    : -1;
  if (endOffset > 0) {
    const raw = content.slice(4, endOffset);
    const { parse } = await import('yaml');
    try {
      frontmatter = parse(raw) as Record<string, unknown>;
    } catch {
      // noop
    }
    const offset = endOffset + 5;
    content = content.slice(offset);
  }
  return { content, frontmatter };
}

export const renderMarkdown = noop;
