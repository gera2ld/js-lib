import { p as n } from "./markdown-Bvp2SNRK.js";
import { getIpfsFile as a } from "./ipfs.js";
import { fetchBlob as e } from "./util.js";
async function u(t = document) {
  t.querySelectorAll("img[data-cid]").forEach(
    async (o) => {
      const r = o.dataset.cid || "", c = await a(r);
      o.src = URL.createObjectURL(c);
    }
  );
}
async function s(t) {
  return t.startsWith("gist:") ? e(`https://gist.githubusercontent.com/raw/${t.slice(5)}`) : /^https?:/.test(t) ? e(t) : a(t);
}
async function d(t) {
  const r = await (await s(t)).text();
  return await n(r);
}
export {
  u as loadImages,
  d as loadMarkdown,
  s as loadUrl
};
