import { loadCSS as o, loadJS as u } from "./util.js";
function d(e) {
  var s;
  let t = ((s = e == null ? void 0 : e.init) == null ? void 0 : s.reset) ?? "normalize";
  return t && (t.includes("://") || (t = `https://cdn.jsdelivr.net/npm/@unocss/reset@65.4.3/${t}.min.css`), o(t)), e != null && e.unocss && (window.__unocss = e.unocss), u(
    "https://cdn.jsdelivr.net/npm/@unocss/runtime@65.4.3"
  );
}
let l;
function c(e) {
  return l || (l = d(e)), l;
}
async function m(e) {
  await c();
  const { uno: t } = window.__unocss_runtime;
  return (await Promise.all(e.map((n) => t.parseToken(n, "-")))).filter(Boolean).flat().sort((n, r) => n[0] - r[0]).sort(
    (n, r) => (n[3] ? t.parentOrders.get(n[3]) ?? 0 : 0) - (r[3] ? t.parentOrders.get(r[3]) ?? 0 : 0)
  ).reduce(
    (n, r) => {
      const i = `${r[1]}
${r[3] || ""}`;
      return n[i] = (n[i] || "") + r[2], n;
    },
    {}
  );
}
async function f(e, t) {
  const s = await m(t.split(" ").filter(Boolean));
  return Object.entries(s).map(([n, r]) => {
    const [i, a] = n.split(`
`);
    return r = `${i.replace(/\s\$\$\s+/g, " ").replace(/\.\\-(?:[^-\w]|$)/g, e)}{${r}}`, a && (r = `${a}{${r}}`), r;
  });
}
async function w(e) {
  return (await Promise.all(
    Object.entries(e).map(
      ([s, n]) => f(s, n)
    )
  )).flat().join(`
`);
}
async function y(e) {
  const t = await w(e), s = document.createElement("style");
  return s.textContent = t, document.head.append(s), s;
}
setTimeout(c);
export {
  w as buildCSSFromShortcuts,
  c as initialize,
  y as injectStyleByShortcuts
};
