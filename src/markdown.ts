import type { Remarkable as IRemarkable } from 'remarkable';
import { getFileByPath } from './ipfs';
import { loadPluginEmoji } from './emoji';
import { loadPluginHljs } from './hljs';
import { IMarkdownData, IMarkdownPlugin } from './types';

let Remarkable: typeof IRemarkable;

export class MarkdownRenderer {
  static async create(
    pluginPromises: Array<IMarkdownPlugin | Promise<IMarkdownPlugin>>
  ) {
    Remarkable ||= (
      (await import(
        'https://cdn.jsdelivr.net/npm/remarkable@2.0.1/+esm'
      )) as typeof import('remarkable')
    ).Remarkable;
    return new MarkdownRenderer(await Promise.all(pluginPromises));
  }

  private md: IRemarkable;

  constructor(private plugins: IMarkdownPlugin[]) {
    this.md = new Remarkable('full', {
      html: true,
      breaks: true,
    });
    plugins.forEach(({ plugin }) => {
      if (plugin) this.md.use(plugin);
    });
  }

  render(content: string) {
    return this.md.render(content);
  }

  postrender(el: HTMLElement) {
    this.plugins.forEach(({ postrender }) => {
      postrender?.(el);
    });
  }
}

let renderer: MarkdownRenderer;

export async function getRenderer() {
  renderer ||= await MarkdownRenderer.create([
    loadPluginEmoji(),
    loadPluginHljs(),
  ]);
  return renderer;
}

export async function renderMarkdown(
  { content }: IMarkdownData,
  el: HTMLElement
) {
  const renderer = await getRenderer();
  el.innerHTML = renderer.render(content);
  renderer.postrender(el);
}

export async function parseFrontmatter(
  content: string
): Promise<IMarkdownData> {
  let frontmatter: Record<string, unknown> | undefined;
  const endOffset = content.startsWith('---\n')
    ? content.indexOf('\n---\n')
    : -1;
  if (endOffset > 0) {
    const raw = content.slice(4, endOffset);
    const { load } = await import(
      'https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/+esm'
    );
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
