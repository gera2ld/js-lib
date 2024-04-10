import type { IMarkdownData } from '@/types';
import { memoize } from '@/util';
import type MarkdownIt from 'markdown-it';
import {
  builtInPlugins,
  pluginMounted,
  pluginPreload,
  type IRenderPlugin,
} from './plugins';

export const loadMarkdownIt = memoize(async () => import('./markdown-it'));

export class MarkdownRenderer {
  private features: Record<string, boolean> = {};

  static async create(plugins = builtInPlugins) {
    const [{ md, highlighters }] = await Promise.all([
      loadMarkdownIt(),
      pluginPreload(plugins),
    ]);
    return new MarkdownRenderer(plugins, md, highlighters);
  }

  constructor(
    public plugins: IRenderPlugin[],
    private md: MarkdownIt,
    highlighters: Record<string, (code: string) => string>,
  ) {
    plugins.forEach(({ name, markdown }) => {
      if (markdown)
        this.md.use(markdown, {
          enableFeature: () => this.enableFeature(name),
          highlighters,
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
      onMounted: (el: HTMLElement) => pluginMounted(el, enabledPlugins),
    };
  }

  process(el: HTMLElement) {
    pluginMounted(el, this.plugins);
  }
}

export const getRenderer = memoize(() => MarkdownRenderer.create());

export async function renderMarkdown(
  { content }: IMarkdownData,
  el?: HTMLElement,
) {
  const renderer = await getRenderer();
  const { html, onMounted } = renderer.render(content);
  if (el) {
    el.innerHTML = html;
    onMounted(el);
  }
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
    const { load } = await import('js-yaml');
    try {
      frontmatter = load(raw) as Record<string, unknown>;
    } catch {
      // noop
    }
    const offset = endOffset + 5;
    content = content.slice(offset);
  }
  return { content, frontmatter };
}
