import { simpleRequest } from 'common-lib/src/http/request.ts';
import { parseFrontmatter } from './render';

export function normalizeUrl(path: string) {
  if (path.startsWith('gist:')) {
    return `https://gist.githubusercontent.com/raw/${path.slice(5)}`;
  }
  return path;
}

export async function loadMarkdown(path: string) {
  const text = await simpleRequest(normalizeUrl(path)).text();
  return await parseFrontmatter(text);
}
