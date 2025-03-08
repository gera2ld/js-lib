import { parseFrontmatter } from "./render/index.ts";
import { fetchBlob } from "./util.ts";
export async function loadUrl(path: string) {
  if (path.startsWith('gist:')) {
    return fetchBlob(`https://gist.githubusercontent.com/raw/${path.slice(5)}`);
  }
  return fetchBlob(path);
}
export async function loadMarkdown(path: string) {
  const blob = await loadUrl(path);
  const text = await blob.text();
  return await parseFrontmatter(text);
}