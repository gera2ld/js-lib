import m from "https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm";
import o from "https://cdn.jsdelivr.net/npm/markdown-it-anchor@9.2.0/+esm";
import t from "https://cdn.jsdelivr.net/npm/markdown-it-ins@4.0.0/+esm";
import u from "https://cdn.jsdelivr.net/npm/markdown-it-mark@4.0.0/+esm";
import e from "https://cdn.jsdelivr.net/npm/markdown-it-sub@2.0.0/+esm";
import i from "https://cdn.jsdelivr.net/npm/markdown-it-sup@2.0.0/+esm";
function k() {
  const r = m({
    html: !0,
    breaks: !0
  });
  return r.use(t).use(u).use(e).use(i).use(o), r;
}
export {
  k as initMarkdownIt
};
