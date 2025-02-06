import { p as n } from "./base-DRyEr0XR.js";
import { fetchBlob as r } from "./util.js";
async function a(t) {
  return t.startsWith("gist:") ? r(`https://gist.githubusercontent.com/raw/${t.slice(5)}`) : r(t);
}
async function c(t) {
  const o = await (await a(t)).text();
  return await n(o);
}
export {
  c as loadMarkdown,
  a as loadUrl
};
