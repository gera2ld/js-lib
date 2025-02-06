async function o(t) {
  const { default: e } = await import("./webfontloader-nXki49hd.js").then((n) => n.w);
  e.load(t.config), t != null && t.fontFamily && a(`*{font-family:${t.fontFamily}}`);
}
function a(t) {
  const e = document.createElement("style");
  return e.textContent = t, document.head.append(e), e;
}
let i = !1;
function l(t) {
  i || (i = !0, o(t));
}
setTimeout(() => {
  var n;
  const t = (n = window.__jslib) == null ? void 0 : n.webFont, e = {
    fontFamily: '"Roboto Slab",serif',
    ...t,
    config: {
      google: {
        families: ["Roboto Slab"],
        display: "swap"
      },
      ...t == null ? void 0 : t.config
    }
  };
  l(e);
});
export {
  l as initialize,
  o as webFont
};
