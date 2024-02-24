import { memoize as c, loadCSS as i, loadJS as u } from "./util.js";
const l = c(
  async (s, r) => {
    let e = (r == null ? void 0 : r.reset) ?? "normalize";
    return e && (e.includes("://") || (e = `https://cdn.jsdelivr.net/npm/@unocss/reset@0.58.3/${e}.min.css`), i(e)), s && (window.__unocss = s), u(
      "https://cdn.jsdelivr.net/npm/@unocss/runtime@0.58.3"
    );
  }
);
async function m(s) {
  await l();
  const { uno: r } = window.__unocss_runtime;
  return (await Promise.all(s.map((t) => r.parseToken(t, "-")))).filter(Boolean).flat().sort((t, n) => t[0] - n[0]).sort(
    (t, n) => (t[3] ? r.parentOrders.get(t[3]) ?? 0 : 0) - (n[3] ? r.parentOrders.get(n[3]) ?? 0 : 0)
  ).reduce(
    (t, n) => {
      const o = `${n[1]}
${n[3] || ""}`;
      return t[o] = (t[o] || "") + n[2], t;
    },
    {}
  );
}
async function d(s, r) {
  const e = await m(r.split(" ").filter(Boolean));
  return Object.entries(e).map(([t, n]) => {
    const [o, a] = t.split(`
`);
    return n = `${o.replace(/\s\$\$\s+/g, " ").replace(/\.\\-(?:[^-\w]|$)/g, s)}{${n}}`, a && (n = `${a}{${n}}`), n;
  });
}
async function f(s) {
  return (await Promise.all(
    Object.entries(s).map(
      ([e, t]) => d(e, t)
    )
  )).flat().join(`
`);
}
async function S(s) {
  const r = await f(s), e = document.createElement("style");
  return e.textContent = r, document.head.append(e), e;
}
setTimeout(l);
export {
  f as buildCSSFromShortcuts,
  l as initialize,
  S as injectStyleByShortcuts
};
