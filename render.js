import { b as i, a as o, c as r, M as l } from "./base-BVtrNa0i.js";
import { d as w, l as f, p as H, e as R, f as k } from "./base-BVtrNa0i.js";
let d = class {
  constructor(e) {
    this.plugins = e;
  }
  static async create(e = i) {
    return await o(e), new this(e);
  }
  render(e) {
    return {
      html: e,
      plugins: this.plugins,
      onMounted: (n) => this.process(n)
    };
  }
  process(e, n = this.plugins) {
  }
};
class g extends d {
  process(e, n = this.plugins) {
    r(e, n);
  }
}
class p extends l {
  process(e, n = this.plugins) {
    r(e, n);
  }
}
async function h({ content: s }, e) {
  const n = await p.create(), { html: t, onMounted: a } = n.render(s);
  e && (e.innerHTML = t, a(e));
}
export {
  g as HtmlRenderer,
  p as MarkdownRenderer,
  i as builtInPlugins,
  w as definePlugin,
  f as loadMarkdownIt,
  H as parseFrontmatter,
  R as patchHighlight,
  k as pluginMap,
  r as pluginMounted,
  o as pluginPreload,
  h as renderMarkdown
};
