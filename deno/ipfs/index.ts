import { fetchBlob, forwardFunction } from "../util.ts";
import { once } from "https://cdn.jsdelivr.net/npm/es-toolkit@1.23.0/+esm";
import type { CID } from "https://esm.sh/multiformats@12.1.3/cid";
const gateway = 'https://dweb.link';
export const isLocalNode = /\.ip[fn]s\.localhost$/.test(globalThis.location?.hostname);
export const meta = parseIpfsUrl(import.meta.url);
const loadIpfs = once(async () => {
  const [{
    createHelia
  }, {
    ipns
  }, {
    unixfs
  }, {
    CID
  }] = await Promise.all([import("https://esm.sh/helia@2.1.0"), import("https://esm.sh/@helia/ipns@3.0.1"), import("https://esm.sh/@helia/unixfs@1.4.3"), import("https://esm.sh/multiformats@12.1.3/cid")]);
  const helia = await createHelia();
  return {
    helia,
    CID,
    ipns: ipns(helia, {}),
    fs: unixfs(helia)
  };
});
export function isIpfsPath(path: string) {
  return /^\/ip[fn]s\/\w/.test(path);
}
export async function resolveIpfsPath(ipfsPath: string) {
  const [scheme, host, ...rest] = ipfsPath.split('/');
  const {
    fs,
    ipns,
    CID
  } = await loadIpfs();
  let cid: CID;
  if (scheme === 'ipns') {
    cid = await ipns.resolveDns(host);
  } else {
    cid = CID.parse(host);
  }
  const path = rest.filter(Boolean).join('/');
  if (path) {
    const res = await fs.stat(cid, {
      path
    });
    cid = res.cid;
  }
  return cid;
}
export function parseIpfsUrl(url: string) {
  const matches = url.match(/\/\/(?:(\w+)\.ipfs\.)?(?:ipfs\.io|w3s\.link|dweb\.link)(?:\/ipfs\/(\w+))?(\/.*)/);
  if (!matches) return;
  const cid = matches[1] || matches[2];
  const path = matches[3];
  return {
    cid,
    path
  };
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
  const {
    fs
  } = await loadIpfs();
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
export const packCar = forwardFunction(() => import("./car.ts").then(({
  packCar
}) => packCar));
export const listCar = forwardFunction(() => import("./car.ts").then(({
  listCar
}) => listCar));