async function o(t) {
  const { default: n } = await import("https://cdn.jsdelivr.net/npm/webfontloader@1.6.28/+esm");
  n.load(t.config), t?.fontFamily && i(`*{font-family:${t.fontFamily}}`);
}
function i(t) {
  const n = document.createElement("style");
  return n.textContent = t, document.head.append(n), n;
}
let e = !1;
function a(t) {
  e || (e = !0, o(t));
}
setTimeout(() => {
  const t = window.__jslib?.webFont, n = {
    fontFamily: '"Roboto Slab",serif',
    ...t,
    config: {
      google: {
        families: ["Roboto Slab"],
        display: "swap"
      },
      ...t?.config
    }
  };
  a(n);
});
export {
  a as webFont
};
