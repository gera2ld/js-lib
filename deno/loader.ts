import { simpleRequest } from "https://gitlab.com/gera2ld/common-lib/-/raw/main/src/http/request.ts";
import { parseFrontmatter } from "./render/index.ts";
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