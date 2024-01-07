import type { CID } from 'multiformats/cid';
import { fetchBlob } from './loader';
import { memoize } from './util';
import { parseFrontmatter } from './render';

const gateway = 'https://dweb.link';

export const isLocalNode = /\.ip[fn]s\.localhost$/.test(
  window.location.hostname,
);
export const meta = parseIpfsUrl(import.meta.url);

const loadIpfs = memoize(async () => {
  const [{ createHelia }, { ipns }, { unixfs }, { CID }] = await Promise.all([
    import('helia'),
    import('@helia/ipns'),
    import('@helia/unixfs'),
    import('multiformats/cid'),
  ]);
  const helia = await createHelia();
  return {
    helia,
    CID,
    ipns: ipns(helia, {}),
    fs: unixfs(helia),
  };
});

export function isIpfsPath(path: string) {
  return /^\/ip[fn]s\/\w/.test(path);
}

export async function resolveIpfsPath(ipfsPath: string) {
  const [scheme, host, ...rest] = ipfsPath.split('/');
  const { fs, ipns, CID } = await loadIpfs();
  let cid: CID;
  if (scheme === 'ipns') {
    cid = await ipns.resolveDns(host);
  } else {
    cid = CID.parse(host);
  }
  const path = rest.filter(Boolean).join('/');
  if (path) {
    const res = await fs.stat(cid, { path });
    cid = res.cid;
  }
  return cid;
}

export function parseIpfsUrl(url: string) {
  const matches = url.match(
    /\/\/(?:(\w+)\.ipfs\.)?(?:ipfs\.io|w3s\.link|dweb\.link)(?:\/ipfs\/(\w+))?(\/.*)/,
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

export async function getFileByIpfsNode(ipfsPath: string) {
  const { fs } = await loadIpfs();
  const chunks: Uint8Array[] = [];
  const cid = await resolveIpfsPath(ipfsPath);
  for await (const chunk of fs.cat(cid)) {
    chunks.push(chunk);
  }
  const blob = new Blob(chunks);
  return blob;
}

export function getFileByIpfsGateway(ipfsPath: string) {
  ipfsPath = normalizeIpfsPath(ipfsPath);
  const urls = [getIpfsPublicUrl(ipfsPath)];
  if (isLocalNode) urls.push(getIpfsSchemeUrl(ipfsPath));
  return Promise.any(urls.map(fetchBlob));
}

export async function getIpfsFile(ipfsPath: string) {
  const promises = [getFileByIpfsGateway(ipfsPath)];
  if (!isLocalNode) promises.push(getFileByIpfsNode(ipfsPath));
  return Promise.any(promises);
}

export async function loadImages(el = document) {
  el.querySelectorAll<HTMLImageElement>('img[data-cid]').forEach(
    async (img) => {
      const cid = img.dataset.cid || '';
      const blob = await getIpfsFile(cid);
      img.src = URL.createObjectURL(blob);
    },
  );
}

export async function getFileByPath(path: string) {
  if (path.startsWith('gist:')) {
    return fetchBlob(`https://gist.githubusercontent.com/raw/${path.slice(5)}`);
  }
  if (/^https?:/.test(path)) {
    return fetchBlob(path);
  }
  return getIpfsFile(path);
}

export async function loadMarkdown(path: string) {
  const blob = await getFileByPath(path);
  const text = await blob.text();
  return await parseFrontmatter(text);
}
