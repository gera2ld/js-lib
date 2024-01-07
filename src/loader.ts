import { parseFrontmatter } from './render';
import { getIpfsFile } from './ipfs';
import { fetchBlob } from './util';

export async function loadImages(el = document) {
  el.querySelectorAll<HTMLImageElement>('img[data-cid]').forEach(
    async (img) => {
      const cid = img.dataset.cid || '';
      const blob = await getIpfsFile(cid);
      img.src = URL.createObjectURL(blob);
    },
  );
}

export async function loadUrl(path: string) {
  if (path.startsWith('gist:')) {
    return fetchBlob(`https://gist.githubusercontent.com/raw/${path.slice(5)}`);
  }
  if (/^https?:/.test(path)) {
    return fetchBlob(path);
  }
  return getIpfsFile(path);
}

export async function loadMarkdown(path: string) {
  const blob = await loadUrl(path);
  const text = await blob.text();
  return await parseFrontmatter(text);
}
