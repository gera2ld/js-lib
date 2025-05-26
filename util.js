function m(e) {
  if (!e.startsWith("gist:")) throw new Error("Invalid gist URL");
  return `https://gist.githubusercontent.com/raw/${e.slice(5)}`;
}
function a(e) {
  return e = new URL(e, import.meta.url).toString(), e;
}
function d(e) {
  return e.replace(
    /[<&]/g,
    (t) => ({
      "<": "&lt;",
      "&": "&amp;"
    })[t] || ""
  );
}
const o = {};
function s(e) {
  let { src: t } = e;
  t && (t = a(t));
  let r = o[t || ""];
  return r || (r = new Promise((c, i) => {
    const n = document.createElement("script");
    Object.entries(e).forEach(([l, u]) => {
      n[l] = u;
    }), n.onload = () => c(), n.onerror = i, (document.body || document.documentElement).append(n), n.remove();
  }), t && (o[t] = r)), r;
}
function f(e) {
  return s({ src: e });
}
function p(e) {
  const t = document.createElement("link");
  t.rel = "stylesheet", t.href = e, document.head.append(t);
}
export {
  a as getFullUrl,
  m as getGistUrl,
  p as loadCSS,
  f as loadJS,
  d as safeHtml
};
