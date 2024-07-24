import { memoize as a } from "./util.js";
async function o(e) {
  const { default: t } = await import("https://cdn.jsdelivr.net/npm/webfontloader@1.6.28/+esm");
  t.load(e == null ? void 0 : e.config), e != null && e.fontFamily && l(`*{font-family:${e.fontFamily}}`);
}
const i = a(o);
function l(e) {
  const t = document.createElement("style");
  return t.textContent = e, document.head.append(t), t;
}
setTimeout(() => {
  var n;
  const e = (n = window.__jslib) == null ? void 0 : n.webFont, t = {
    fontFamily: '"Roboto Slab",serif',
    ...e,
    config: {
      google: {
        families: ["Roboto Slab"],
        display: "swap"
      },
      ...e == null ? void 0 : e.config
    }
  };
  i(t);
});
export {
  i as initialize,
  o as webFont
};
