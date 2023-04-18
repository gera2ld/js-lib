import { getFileByPath } from './ipfs';
import { loadEmoji } from './emoji';

export async function renderMarkdown({
  content,
  frontmatter,
}: {
  content: string;
  frontmatter?: Record<string, unknown>;
}) {
  const [{ marked }, emoji] = await Promise.all([
    import('https://cdn.jsdelivr.net/npm/marked@4.3.0/+esm'),
    loadEmoji(),
  ]);
  const html = marked(emoji.replace_colons(content));
  return { content, frontmatter, html };
}

export async function parseFrontmatter(content: string) {
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
