const cache: Record<string, Promise<void>> = {};
const gateway = 'https://dweb.link';

export const isLocalNode = /\.ip[fn]s\.localhost$/.test(
  window.location.hostname
);
export const meta = parseIpfsUrl(import.meta.url);

export function isIpfsPath(path: string) {
  return /^\/ip[fn]s\/\w/.test(path);
}

export function parseIpfsUrl(url: string) {
  const matches = url.match(
    /\/\/(?:(\w+)\.ipfs\.)?(?:ipfs\.io|w3s\.link|dweb\.link)(?:\/ipfs\/(\w+))?(\/.*)/
  );
  if (!matches) return;
  const cid = matches[1] || matches[2];
  const path = matches[3];
  return { cid, path };
}

export function normalizeIpfsPath(ipfsPathOrCid: string) {
  if (isIpfsPath(ipfsPathOrCid)) return ipfsPathOrCid;
  return `/ipfs/${ipfsPathOrCid}`;
}

export function getIpfsSchemeUrl(ipfsPath: string) {
  ipfsPath = normalizeIpfsPath(ipfsPath);
  const [, scheme, ...rest] = ipfsPath.split('/');
  return `${scheme}://${rest.join('/')}`;
}

export function getIpfsPublicUrl(ipfsPath: string) {
  return `${gateway}${normalizeIpfsPath(ipfsPath)}`;
}

export async function getFileByIpfs(ipfsPath: string) {
  const ipfs = await loadCore();
  const chunks: Uint8Array[] = [];
  for await (const chunk of ipfs.cat(ipfsPath)) {
    chunks.push(chunk);
  }
  const blob = new Blob(chunks);
  return blob;
}

export async function fetchFile(url: string) {
  const res = await fetch(url);
  const text = await res.blob();
  return text;
}

export function getFileByGateway(ipfsPath: string) {
  ipfsPath = normalizeIpfsPath(ipfsPath);
  const urls = [getIpfsPublicUrl(ipfsPath)];
  if (isLocalNode) urls.push(getIpfsSchemeUrl(ipfsPath));
  return Promise.any(urls.map(fetchFile));
}

/** @param {string} ipfsPath */
export async function resolveIpfsPath(ipfsPath: string) {
  ipfsPath = normalizeIpfsPath(ipfsPath);
  const ipfs = await loadCore();
  ipfsPath = await ipfs.resolve(ipfsPath);
  return ipfsPath;
}

export async function getIpfsFile(ipfsPath: string) {
  const promises = [getFileByGateway(ipfsPath)];
  if (!isLocalNode) promises.push(getFileByIpfs(ipfsPath));
  return Promise.any(promises);
}

export function getFullUrl(url: string) {
  url = new URL(url, import.meta.url).toString();
  return url;
}

function loadScript(attrs: Record<string, string>) {
  let { src } = attrs;
  if (src) src = getFullUrl(src);
  let value = cache[src || ''];
  if (!value) {
    value = new Promise((resolve, reject) => {
      const el = document.createElement('script');
      Object.entries(attrs).forEach(([key, value]) => {
        el[key] = value;
      });
      el.onload = () => resolve();
      el.onerror = reject;
      (document.body || document.documentElement).append(el);
      el.remove();
    });
    if (src) cache[src] = value;
  }
  return value;
}

export function loadJS(src: string) {
  return loadScript({ src });
}

export function loadModule(src: string) {
  return loadScript({ src, type: 'module' });
}

let corePromise: Promise<any>;

async function loadCoreOnce() {
  await loadJS(
    'https://cdn.jsdelivr.net/npm/ipfs-core@0.18.0/dist/index.min.js'
  );
  const ipfs = await window.IpfsCore.create();
  return ipfs;
}

export function loadCore() {
  corePromise ||= loadCoreOnce();
  return corePromise;
}

export async function loadImages(el = document) {
  el.querySelectorAll<HTMLImageElement>('img[data-cid]').forEach(
    async (img) => {
      const cid = img.dataset.cid || '';
      const blob = await getIpfsFile(cid);
      img.src = URL.createObjectURL(blob);
    }
  );
}

export async function parseFrontmatter(content: string) {
  const result = { content, frontmatter: null };
  if (!content.startsWith('---\n')) return result;
  const endOffset = content.indexOf('\n---\n');
  if (endOffset < 0) return result;
  const raw = content.slice(4, endOffset);
  const { load } = await import(
    'https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/+esm'
  );
  try {
    result.frontmatter = load(raw);
  } catch {
    // noop
  }
  const offset = endOffset + 5;
  result.content = content.slice(offset);
  return result;
}

export async function loadMarkdown(cid: string) {
  const blob = await getIpfsFile(cid);
  const text = await blob.text();
  return await parseFrontmatter(text);
}

export async function renderMarkdown(cid: string) {
  const { content, frontmatter } = await loadMarkdown(cid);
  const { marked } = await import(
    'https://cdn.jsdelivr.net/npm/marked@4.1.1/+esm'
  );
  const html = marked(content);
  return { content, frontmatter, html };
}
