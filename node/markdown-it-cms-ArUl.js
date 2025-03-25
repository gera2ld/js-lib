import m from "markdown-it";
import o from "markdown-it-anchor";
import t from "markdown-it-ins";
import u from "markdown-it-mark";
import e from "markdown-it-sub";
import i from "markdown-it-sup";
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
