import { fetchBlob as w, forwardFunction as p } from "./util.js";
import { once as h } from "https://cdn.jsdelivr.net/npm/es-toolkit@1.27.0/+esm";
const I = "https://dweb.link";
var l;
const f = /\.ip[fn]s\.localhost$/.test(
  (l = globalThis.location) == null ? void 0 : l.hostname
), U = d(import.meta.url), u = h(async () => {
  const [{ createHelia: t }, { ipns: n }, { unixfs: s }, { CID: o }] = await Promise.all([
    import("https://cdn.jsdelivr.net/npm/helia@2.1.0/+esm"),
    import("https://cdn.jsdelivr.net/npm/@helia/ipns@3.0.1/+esm"),
    import("https://cdn.jsdelivr.net/npm/@helia/unixfs@1.4.3/+esm"),
    import("https://cdn.jsdelivr.net/npm/multiformats@12.1.3/cid/+esm")
  ]), e = await t();
  return {
    helia: e,
    CID: o,
    ipns: n(e, {}),
    fs: s(e)
  };
});
function b(t) {
  return /^\/ip[fn]s\/\w/.test(t);
}
async function y(t) {
  const [n, s, ...o] = t.split("/"), { fs: e, ipns: r, CID: m } = await u();
  let i;
  n === "ipns" ? i = await r.resolveDns(s) : i = m.parse(s);
  const a = o.filter(Boolean).join("/");
  return a && (i = (await e.stat(i, { path: a })).cid), i;
}
function d(t) {
  const n = t.match(
    /\/\/(?:(\w+)\.ipfs\.)?(?:ipfs\.io|w3s\.link|dweb\.link)(?:\/ipfs\/(\w+))?(\/.*)/
  );
  if (!n) return;
  const s = n[1] || n[2], o = n[3];
  return { cid: s, path: o };
}
function c(t) {
  return b(t) ? t : `/ipfs/${t}`;
}
function g(t) {
  t = c(t);
  const [, n, ...s] = t.split("/");
  return `${n}://${s.join("/")}`;
}
function k(t) {
  return `${I}${c(t)}`;
}
async function $(t) {
  const { fs: n } = await u(), s = [], o = await y(t);
  for await (const r of n.cat(o))
    s.push(r);
  return new Blob(s);
}
function B(t) {
  t = c(t);
  const n = [k(t)];
  return f && n.push(g(t)), Promise.any(n.map(w));
}
async function j(t) {
  const n = [B(t)];
  return f || n.push($(t)), Promise.any(n);
}
const v = p(
  () => import("./car-Ddia3k4S.js").then(({ packCar: t }) => t)
), x = p(
  () => import("./car-Ddia3k4S.js").then(({ listCar: t }) => t)
);
export {
  B as getFileByIpfsGateway,
  $ as getFileByIpfsNode,
  j as getIpfsFile,
  k as getIpfsPublicUrl,
  g as getIpfsSchemeUrl,
  b as isIpfsPath,
  f as isLocalNode,
  x as listCar,
  U as meta,
  c as normalizeIpfsPath,
  v as packCar,
  d as parseIpfsUrl,
  y as resolveIpfsPath
};
