async function f(e) {
  const { default: t } = await import("https://cdn.jsdelivr.net/npm/webfontloader@1.6.28/+esm");
  t.load(e == null ? void 0 : e.config), e != null && e.fontFamily && l(`*{font-family:${e.fontFamily}}`);
}
function l(e) {
  const t = document.createElement("style");
  return t.textContent = e, document.head.append(t), t;
}
var a;
const n = (a = window.__jslib) == null ? void 0 : a.webFont;
if (n) {
  const e = {
    fontFamily: '"Roboto Slab",serif',
    ...n,
    config: {
      google: {
        families: ["Roboto Slab"],
        display: "swap"
      },
      ...n.config
    }
  };
  f(e);
}
export {
  f as webFont
};
