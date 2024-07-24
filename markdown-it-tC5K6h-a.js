import s from "https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm";
import e from "https://cdn.jsdelivr.net/npm/markdown-it-ins@4.0.0/+esm";
import u from "https://cdn.jsdelivr.net/npm/markdown-it-mark@4.0.0/+esm";
import i from "https://cdn.jsdelivr.net/npm/markdown-it-sub@2.0.0/+esm";
import d from "https://cdn.jsdelivr.net/npm/markdown-it-sup@2.0.0/+esm";
const m = {}, p = s({
  html: !0,
  breaks: !0,
  highlight(t, o) {
    const r = m[o] || m.default;
    return r == null ? void 0 : r(t);
  }
});
p.use(e).use(u).use(i).use(d);
export {
  m as highlighters,
  p as md
};
