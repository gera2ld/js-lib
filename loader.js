import { simpleRequest as e } from "./util.js";
import { p as i } from "./base-DP07fkw7.js";
function n(t) {
  return t.startsWith("gist:") ? `https://gist.githubusercontent.com/raw/${t.slice(5)}` : t;
}
async function a(t) {
  const r = await e(n(t)).text();
  return await i(r);
}
export {
  a as loadMarkdown,
  n as normalizeUrl
};
