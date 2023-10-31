import type { Remarkable as IRemarkable } from 'remarkable';
import { getFileByPath } from './ipfs';
import { loadPluginEmoji } from './emoji';
import { loadPluginHljs } from './hljs';
import { loadPluginVega } from './vega';
import { IMarkdownData, IMarkdownPlugin } from './types';
import { memoize } from './loader';

export const loadRemarkable = memoize(async () => {
  const { Remarkable } = await import('remarkable');
  return Remarkable;
});

export class MarkdownRenderer {
  static async create(
    pluginPromises: Array<IMarkdownPlugin | Promise<IMarkdownPlugin>>,
  ) {
    const [Remarkable, plugins] = await Promise.all([
      loadRemarkable(),
      Promise.all(pluginPromises),
    ]);
    const md = new Remarkable('full');
    return new MarkdownRenderer(md, plugins);
  }

  private features: Record<string, boolean> = {};

  constructor(
    private md: IRemarkable,
    private plugins: IMarkdownPlugin[],
  ) {
    this.md.set({
      html: true,
      breaks: true,
    });
    plugins.forEach(({ name, plugin }) => {
      if (plugin)
        this.md.use(plugin, { enableFeature: () => this.enableFeature(name) });
    });
  }

  private enableFeature(name: string) {
    this.features[name] = true;
  }

  render(content: string) {
    this.features = {};
    const html = this.md.render(content);
    const enabledPlugins = this.plugins.filter(
      ({ name, always }) => always || this.features[name],
    );
    const onMounted = (el: HTMLElement) => {
      enabledPlugins.forEach(({ onMounted }) => {
        onMounted?.(el);
      });
    };
    return { html, onMounted };
  }
}

let renderer: MarkdownRenderer;

export async function getRenderer() {
  renderer ||= await MarkdownRenderer.create([
    loadPluginEmoji(),
    loadPluginHljs(),
    loadPluginVega(),
  ]);
  return renderer;
}

export async function renderMarkdown({ content }: IMarkdownData) {
  const renderer = await getRenderer();
  return renderer.render(content);
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
      frontmatter = load(raw);
    } catch {
      // noop
    }
    const offset = endOffset + 5;
    content = content.slice(offset);
  }
  return { content, frontmatter };
}

export async function loadMarkdown(path: string) {
  const blob = await getFileByPath(path);
  const text = await blob.text();
  return await parseFrontmatter(text);
}
