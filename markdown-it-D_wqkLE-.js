import e from "https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm";
import n from "https://cdn.jsdelivr.net/npm/markdown-it-anchor@9.2.0/+esm";
import s from "https://cdn.jsdelivr.net/npm/markdown-it-ins@4.0.0/+esm";
import d from "https://cdn.jsdelivr.net/npm/markdown-it-mark@4.0.0/+esm";
import f from "https://cdn.jsdelivr.net/npm/markdown-it-sub@2.0.0/+esm";
import i from "https://cdn.jsdelivr.net/npm/markdown-it-sup@2.0.0/+esm";
function I(o) {
  const m = e({
    html: !0,
    breaks: !0,
    highlight(u, t) {
      const r = o[t] || o.default;
      return r == null ? void 0 : r(u, t);
    }
  });
  return m.use(s).use(d).use(f).use(i).use(n), m;
}
export {
  I as initMarkdownIt
};
